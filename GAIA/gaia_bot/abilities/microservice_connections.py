import socket
import asyncio
import subprocess
import psutil

from gaia_bot.kernel.configs.port_configs import PORTS, PORT_COMPONENTS


class MicroserviceConnection:

    async def activate_microservice(self):
        services = []
        microservice_state = self.check_microservice_state()
        for item in microservice_state:
            if microservice_state[item] == False:
                process = await asyncio.gather(self.activate_microservice_by_name(item))
                await process[0].wait()
                if process[0].returncode == 0:
                    services.append({item: "ACTIVE"})
                else: 
                    print(f"Failed to activate {item}")
                    services.append({item: "INACTIVE"})
            else:
                services.append({item: "ACTIVE"})
        
        return services

    async def activate_microservice_by_name(self, microservice_name):
        bash_script_path = PORTS[microservice_name]["shell_path"]
        if PORTS[microservice_name].get("process_name") is not None:
            process_name = PORTS[microservice_name].get("process_name")
            return await asyncio.create_subprocess_exec(
                "gnome-terminal", "--title", process_name, 
                "--", "bash", "-c", f"bash {bash_script_path}"
            )
        return await asyncio.create_subprocess_exec(
            "gnome-terminal", "--title", PORTS[microservice_name]["name"], 
            "--", "bash", "-c", f"bash {bash_script_path}"
        )

    def call_microservice_by_name(self, microservice_name):
        bash_script_path = PORTS[microservice_name]["shell_path"]
        try:
            subprocess.run(
                ["gnome-terminal", "--", "bash", "-c", f"bash {bash_script_path}"]
            )
        except subprocess.CalledProcessError as e:
            print("Error running the bash script: ", e)

    def check_microservice_state(self):
        microservice_state = {}
        for microservice in PORT_COMPONENTS:
            process_name = PORTS[microservice].get("process_name")
            if process_name:
                if self._check_process_running(process_name):
                    microservice_state[microservice] = True
                else:
                    microservice_state[microservice] = False
            else:
                port = PORTS[microservice].get("port")
                if port:
                    if self._check_port_in_used(port):
                        microservice_state[microservice] = True
                    else:
                        microservice_state[microservice] = False
                else:
                    microservice_state[microservice] = False
        return microservice_state

    def check_microservice_state_by_name(self, microservice_name):
        return self._check_port_in_used(PORTS[microservice_name]["port"])

    async def wait_microservice(self, microservice_name):
        while True:
            auth_service_ready = self._check_port_in_used(
                PORTS[microservice_name]["port"]
            )
            if auth_service_ready:
                return True
            await asyncio.sleep(1)

    def _check_port_in_used(self, port):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)

        try:
            sock.bind(("localhost", port))
            available = False
        except OSError:
            available = True
        sock.close()

        return available

    def _check_process_running(self, process_name):
        try:
            output = subprocess.check_output(['wmctrl', '-l', '-p']).decode('utf-8')
            for line in output.splitlines():
                parts = line.split(None, 4)
                if len(parts) >= 5:
                    window_id, desktop_id, pid, machine, window_title = parts
                    window_title = window_title.strip()
                    if window_title == process_name:
                        # Kiểm tra nếu tiến trình PID thuộc về gnome-terminal
                        proc = psutil.Process(int(pid))
                        if 'gnome-terminal' in proc.name().lower():
                            return True
            return False
        except subprocess.CalledProcessError as e:
            print("Error checking window titles:", e)
            return False
        except Exception as e:
            print("Unexpected error:", e)
            return False