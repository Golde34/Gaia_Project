import asyncio

from gaia_bot.modules.skills.assistant_skill import AssistantSkill
from gaia_bot.kernel.configs.port_configs import PORTS
from gaia_bot.kernel.utils.activate_microservice import check_microservice_state, check_port_in_use


class ActivateMicroservice(AssistantSkill):

    def __init__(self):
        pass

    async def activate_microservice(self):
        microservice_state = check_microservice_state()
        for item in microservice_state:
            if microservice_state[item] == False:
                await asyncio.gather(self.activate_microservice_by_name(item))

    async def activate_microservice_by_name(self, microservice_name):
        bash_script_path = PORTS[microservice_name]['shell_path']
        return await asyncio.create_subprocess_exec('gnome-terminal', '--', 'bash', '-c', f'bash {bash_script_path}')

    async def wait_microservice(self, microservice_name):
        while True:
            auth_service_ready = check_port_in_use(PORTS[microservice_name]['port'])
            if auth_service_ready:
                return True
            await asyncio.sleep(1)
        return False