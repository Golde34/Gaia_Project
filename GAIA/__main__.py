import logging
import colorama
from colorama import Fore
import asyncio

from gaia_bot.configs.__version__ import __version__
from gaia_bot.core.console_manager import ConsoleManager
from gaia_bot.skills.assistant_skill import AssistantSkill
from gaia_bot.skills.registry import SKILLS
from gaia_bot.core.processor import Processor
from gaia_bot.configs import settings
from gaia_bot.utils.startup import recognize_owner_by_authen_service
from gaia_bot.utils.activate_microservice import activate_microservice, wait_for_all_microservices


# async def activate_microservices():
#     gaia_connector, auth_service, task_manager = await activate_microservice()
#     await gaia_connector.wait()
#     await auth_service.wait()
#     await task_manager.wait()

def simple_handle_testing(console_input):
    if console_input == "bye" or console_input == "off":
        boolean_loop = False
    else:
        boolean_loop = True
    
    return boolean_loop

async def main():
    # Activate microservices
    await activate_microservice()
    await wait_for_all_microservices()
    # Initiate bot console
    colorama.init()
    print(f"Gaia version: ${__version__}")
    # Startup
    console_manager = ConsoleManager()
    assistant = AssistantSkill()
    console_manager.wakeup(text="Hello boss, I'm available now",
                           info_log="Bot wakeup...",
                           refresh_console=True)
    
    is_owner = await recognize_owner_by_authen_service('golde', '483777')
    print(is_owner)
    
    # initiate
    _boolean_loop = True
    process = Processor(console_manager=console_manager, assistant=assistant, settings=settings) 
    while _boolean_loop:
        console_manager.console_output(text="Listen your command",
                                       info_log="Listen command")
        # process
        process.run()
        # _boolean_loop = simple_handle_testing(i)    


if __name__ == "__main__":
    asyncio.run(main())