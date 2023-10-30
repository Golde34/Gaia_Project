from gaia_bot.skills.assistant_skill import AssistantSkill
from gaia_bot.configs.port_configs import PORTS, PORT_COMPONENTS
import socket
import asyncio


class ActivateMicroservice(AssistantSkill):

    def __init__(self):
        pass

    async def activate_microservice(self):
        microservice_state = self.check_microservice_state()
        for item in microservice_state:
            if microservice_state[item] == False:
                await asyncio.gather(self.activate_microservice_by_name(item))

    async def activate_microservice_by_name(self, microservice_name):
        bash_script_path = PORTS[microservice_name]['shell_path']
        return await asyncio.create_subprocess_exec('gnome-terminal', '--', 'bash', '-c', f'bash {bash_script_path}')

    def check_port_in_use(self, port):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        
        try:
            sock.bind(('localhost', port))
            available = False # not running
        except OSError:
            available = True # running
            
        sock.close()
        
        return available

    def check_microservice_state(self):
        microservice_state = {
            "gaia_connector": False, # Default, false is not running
            "authentication_service": False,
            "task_manager": False
        }
        for microservice in PORT_COMPONENTS:
            if self.check_port_in_use(PORTS[microservice]['port']) == False:
                microservice_state[microservice] = False
            else:
                microservice_state[microservice] = True
        return microservice_state   

    async def wait_microservice(self, microservice_name):
        while True:
            auth_service_ready = self.check_port_in_use(PORTS[microservice_name]['port'])
            if auth_service_ready:
                return True
            await asyncio.sleep(1)
        return False