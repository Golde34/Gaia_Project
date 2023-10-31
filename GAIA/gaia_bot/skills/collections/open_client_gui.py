import asyncio
import json

from gaia_bot.skills.assistant_skill import AssistantSkill
from gaia_bot.configs.port_configs import PORTS
from gaia_bot.utils.activate_microservice import check_microservice_state_by_name, check_port_in_use


class OpenClientGUI(AssistantSkill):
    
    def __init__(self): 
        self.client_gui = "client_gui"

    async def open_client_gui(self):
        if check_microservice_state_by_name(self.client_gui):
            await self._activate_client_gui()
        else:
            print("Client GUI is not running...")
        # wait = await self._wait_client_gui()
        # if wait == True:
        #     access_token, refresh_token = self._get_token_parameters()
        #     await self._connect_client_gui(access_token, refresh_token)
        # else:
        #     print("Later kick off, we got a trouble now")

    async def _activate_client_gui(self):
        bash_script_path = PORTS[self.client_gui]['shell_path']
        await asyncio.create_subprocess_exec('gnome-terminal', '--', 'bash', '-c', f'bash {bash_script_path}')

    # async def _connect_client_gui(self, access_token, refresh_token):
    #     client_gui_command = ClientGUICommand(access_token, refresh_token)
    #     await client_gui_command.connect_client_gui_command()
    #     # TODO

    async def _wait_client_gui(self):
        while True:
            client_gui_ready = check_port_in_use(PORTS[self.client_gui]['port'])
            if client_gui_ready:
                return True
            await asyncio.sleep(1)
        
    def _get_token_parameters(self):
        filepath = "..\\..\\local\\resources\\authen_cache\\response.json"
        with open(filepath, "r") as f:
            response = json.load(f)
        return response['accessToken'], response['refreshToken']