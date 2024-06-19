import asyncio
import colorama

from gaia_bot_v2.commands.response import AlpacaResponse
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
    register_models = await loop.run_in_executor(None, _register_ai_models) 
    # authentication_result = await _authentication_process()
    authentication_result = "OK"
    services = await _start_satellite_services()
    console_manager, assistant = await loop.run_in_executor(None, _startup, authentication_result, services, register_models)
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
        register_models=register_models,
    )


def _startup(authentication_result, services, register_models):
    console_manager = ConsoleManager()
    assistant = AssistantSkill()
    generate_model, generate_tokenizer = register_models["response"]
    wakeup_text=AlpacaResponse.generate_greeting(generate_model, generate_tokenizer)
    console_manager.wakeup(
        text=wakeup_text,   
        info_log="Bot wakeup...",
        refresh_console=True,
        services=services,
        authentication=authentication_result,
    )
    return console_manager, assistant


def _register_ai_models():
    return load_models.run_model_in_parallel()


async def _start_satellite_services():
    microservice_connection = MicroserviceConnection()
    return await microservice_connection.activate_microservice()


async def _authentication_process():
    token = await AuthenticationCommand().process()
    if token == None:
        print("Authentication failed, process user to guess mode.")
        _process_guess_mode()
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
