import socket
import asyncio
import subprocess

from gaia_bot_v2.kernel.configs.port_configs import PORTS, PORT_COMPONENTS


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
            if self.check_port_in_use(PORTS[microservice]["port"]) == False:
                microservice_state[microservice] = False
            else:
                microservice_state[microservice] = True
        return microservice_state

    def check_microservice_state_by_name(self, microservice_name):
        return self.check_port_in_use(PORTS[microservice_name]["port"])

    async def wait_microservice(self, microservice_name):
        while True:
            auth_service_ready = self.check_port_in_use(
                PORTS[microservice_name]["port"]
            )
            if auth_service_ready:
                return True
            await asyncio.sleep(1)

    def check_port_in_use(self, port):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)

        try:
            sock.bind(("localhost", port))
            available = False
        except OSError:
            available = True
        sock.close()

        return available
