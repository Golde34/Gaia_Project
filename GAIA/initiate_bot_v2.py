import asyncio
import colorama
from gaia_bot_v2.commands.authentication import AuthenticationCommand
from gaia_bot_v2.process.console_manager import ConsoleManager
from gaia_bot_v2.kernel.configs import settings
from gaia_bot_v2.kernel.utils.thread_executor import execute_in_thread


async def process_bot_v2():
    # Initiate bot console
    colorama.init()
    print(f"Gaia version: 2.0.0")
    # Startup
    loop = asyncio.get_event_loop()
    console_manager, assistant = await loop.run_in_executor(None, _startup)
    services = execute_in_thread(loop, _start_satellite_services)()
    # Authen user
    # token = await AuthenticationCommand().process()
    # if token == None:
    #     print("Authentication failed, process user to guess mode.")
    #     _process_guess_mode(console_manager, assistant)
    # print("Authentication success, initiate Gaia.")
    # print("Your gaia authen token: ", token)
    # print("You can access these services: ", services)
    # initiate
    token = "token"
    print(console_manager)
    _initiate_gaia(
        console_manager=console_manager,
        assistant=assistant,
        settings=settings,
        token=token,
        services=services,
    )


def _startup():
    console_manager = ConsoleManager()
    assistant = "assistant"
    return console_manager, assistant


def _start_satellite_services():
    pass


def _process_guess_mode(console_manager, assistant):
    pass


def _initiate_gaia(console_manager, assistant, settings, token, services):
    print(console_manager, assistant)
    console_manager.console_output('Hello')
    pass
