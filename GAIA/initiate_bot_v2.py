import asyncio
import colorama

from gaia_bot_v2.commands.authentication import AuthenticationCommand
from gaia_bot_v2.process.console_manager import ConsoleManager
from gaia_bot_v2.kernel.configs import settings
from gaia_bot_v2.process.assistant_skill import AssistantSkill
from gaia_bot_v2.process.processor import Processor
from gaia_bot_v2.models import load_models
from gaia_bot_v2.commands.microservice_connections import MicroserviceConnection


async def process_bot_v2():
    # Initiate bot console
    colorama.init()
    print(f"Gaia version: 2.0.0")
    # Startup
    loop = asyncio.get_event_loop()
    console_manager, assistant = await loop.run_in_executor(None, _startup)
    results = await loop.run_in_executor(None, _register_ai_models)
    authentication_result = _authentication_process()
    services = await _start_satellite_services()
    # Initiate
    token = authentication_result
    print("Authentication success, initiate Gaia.")
    print("Your gaia authen token: ", token)
    print("You can access these services: ", services)
    
    await _initiate_gaia(
        console_manager=console_manager,
        assistant=assistant,
        settings=settings,
        token=token,
        services=services,
        register_models=results,
    )


def _startup():
    console_manager = ConsoleManager()
    assistant = AssistantSkill()
    console_manager.wakeup(
        text="Hello boss, I'm available now",
        info_log="Bot wakeup...",
        refresh_console=True,
    )
    return console_manager, assistant


def _register_ai_models():
    return load_models.run_model_in_parallel()


async def _start_satellite_services():
    microservice_connection = MicroserviceConnection()
    return await microservice_connection.activate_microservice()

def _authentication_process():
    # token = await AuthenticationCommand().process()
    # if token == None:
    #     print("Authentication failed, process user to guess mode.")
    #     _process_guess_mode()
    token = "ok"
    return token 
    


def _process_guess_mode(c):
    pass


async def _initiate_gaia(
    console_manager, assistant, settings, token, services, register_models
):
    boolean_loop = True
    process = Processor(
        console_manager=console_manager,
        assistant=assistant,
        settings=settings,
        register_models=register_models,
    )
    while boolean_loop:
        console_manager.console_output(
            text="Listen your command", info_log="Listen command"
        )
        response_transcript, skill = await process.run()
        console_manager.console_output(
            text=response_transcript,
            info_log="Response transcript with skill: " + skill,
        )
