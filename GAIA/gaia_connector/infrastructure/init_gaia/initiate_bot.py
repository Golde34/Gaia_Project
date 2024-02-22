import logging
import colorama
from colorama import Fore
import asyncio
import argparse

from gaia_bot.configs.__version__ import __version__
from gaia_bot.core.console_manager import ConsoleManager
from gaia_bot.skills.assistant_skill import AssistantSkill
from gaia_bot.skills.registry import SKILLS
from gaia_bot.core.processor import Processor
from gaia_bot.configs import settings
from gaia_bot.utils.startup import recognize_owner_by_authen_service
from gaia_bot.utils.activate_microservice import activate_microservice


async def process_bot():
    # Activate microservices
    await activate_microservice()
    # Authenticate user
    auth_info = {
        "username": "golde",
        "password": "483777"
    }
    access_token = await recognize_owner_by_authen_service(auth_info['username'], auth_info['password'])
    print(access_token)
    # Initiate bot console
    colorama.init()
    print(f"Gaia version: ${__version__}")
    # Startup
    console_manager, assistant = _startup()
    # initiate
    _initiate_gaia_command(console_manager=console_manager, assistant=assistant, settings=settings) 

def _startup():
    console_manager = ConsoleManager()
    assistant = AssistantSkill()
    console_manager.wakeup(text="Hello boss, I'm available now",
                          info_log="Bot wakeup...",
                          refresh_console=True)
    return console_manager, assistant

def _initiate_gaia_command(console_manager, assistant, settings):
    boolean_loop = True
    process = Processor(console_manager=console_manager, assistant=assistant, settings=settings)
    while boolean_loop:
        console_manager.console_output(text="Listen your command",
                                       info_log="Listen command")
        response_transcript, skill = process.run()
        console_manager.console_output(text=response_transcript, info_log="Response transcript with skill: " + skill)
        # _boolean_loop = simple_handle_testing(i)
 
def simple_handle_testing(console_input):
    if console_input == "bye" or console_input == "off":
        boolean_loop = False
    else:
        boolean_loop = True
    
    return boolean_loop



## TEST BETA FUNCTION
# async def why_you_always_die_gaia_connector():
#     bash_script = "gaia_bot/modules/ports/bash_shells/gaia_connector.sh"
#     return await asyncio.create_subprocess_exec('gnome-terminal', '--', 'bash', '-c', f'bash {bash_script}')
#
# if __name__ == "__main__":
#     asyncio.run(why_you_always_die_gaia_connector())
#     asyncio.run(main())