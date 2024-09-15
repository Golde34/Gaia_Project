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
        return await asyncio.create_subprocess_exec(
            "gnome-terminal", "--", "bash", "-c", f"bash {bash_script_path}"
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
            if PORTS[microservice]["port"] is not None and self._check_port_in_used(PORTS[microservice]["port"]) == False:
                microservice_state[microservice] = False
            else:
                microservice_state[microservice] = True
        else:
            process_name = PORTS[microservice]["process_name"]
            if process_name:
                if self._check_process_running(process_name):
                    microservice_state[microservice] = True
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
        for proc in psutil.process_iter(['name', 'cmdline']):
            try:
                if process_name in proc.info['name']:
                    return True
                elif any(process_name in cmd for cmd in proc.info['cmdline']):
                    return True
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                pass
        return False 