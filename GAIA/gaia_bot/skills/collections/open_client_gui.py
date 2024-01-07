import asyncio
import webbrowser

from gaia_bot.skills.assistant_skill import AssistantSkill
from gaia_bot.configs.port_configs import PORTS, DOMAIN
from gaia_bot.utils.activate_microservice import check_microservice_state_by_name, check_port_in_use
from gaia_bot.modules.local.resources.cache.cache import cache


port = PORTS['client_gui']['port']
url = f"http://{DOMAIN}:{port}/"

class OpenClientGUI(AssistantSkill):
    
    port = PORTS['client_gui']['port']
    url = f"http://{DOMAIN}:{port}/"
    
    @classmethod
    async def open_client_gui(cls, text, **kwargs):
        if check_microservice_state_by_name('client_gui') == False:
            print("Client GUI is running...")
            await cls._activate_client_gui()
            
        browser_status = cls._get_opened_browser_status()
        if not browser_status:
            cache.save_value('is_browser_opened', True)
            await cls._open_browser()
        else:
            print("Client GUI is already opened")

    async def _open_browser():
        return await webbrowser.open(url)
     
    async def _activate_client_gui():
        bash_script_path = PORTS['client_gui']['shell_path']
        await asyncio.create_subprocess_exec('gnome-terminal', '--', 'bash', '-c', f'bash {bash_script_path}')
        
    def _get_opened_browser_status():
        return cache.get_saved_value('is_browser_opened')
    