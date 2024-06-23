import asyncio
import colorama

from gaia_bot_v2.abilities.microservice_connections import MicroserviceConnection
from gaia_bot_v2.abilities.response import AlpacaResponse
from gaia_bot_v2.process.authentication import AuthenticationCommand
from gaia_bot_v2.process.console_manager import ConsoleManager
from gaia_bot_v2.kernel.configs import settings
from gaia_bot_v2.process.assistant_skill import AssistantSkill
from gaia_bot_v2.process.processor import Processor
from gaia_bot_v2.models import load_models
from gaia_bot.modules.local.models.task_detect.prompt_to_response.inference import infer


async def process_bot_v2():
    # Initiate bot console
    colorama.init()
    print(f"Gaia version: 2.0.0")
    # Startup
    loop = asyncio.get_event_loop()
    register_models = await loop.run_in_executor(None, _register_ai_models) 
    services = await _start_satellite_services()
    console_manager, assistant = await loop.run_in_executor(None, _startup, services, register_models)
    # Initiate
    authentication_service = [item for item in services if "authentication_service" in item.keys()]
    auth_status = authentication_service[0].get("authentication_service") == "ACTIVE"
    
    token = await _authentication_process(console_manager=console_manager, auth_service_status=auth_status)

    await _initiate_gaia(
        console_manager=console_manager,
        assistant=assistant,
        settings=settings,
        token=token,
        services=services,
        register_models=register_models,
    )


def _startup(services, register_models):
    console_manager = ConsoleManager()
    assistant = AssistantSkill()
    generate_model, generate_tokenizer = register_models["response"]
    wakeup_text = AlpacaResponse.generate_greeting(generate_model, generate_tokenizer)
    console_manager.wakeup(
        text=wakeup_text,   
        info_log="Bot wakeup...",
        refresh_console=True,
        services=services
    )
    return console_manager, assistant


def _register_ai_models():
    return load_models.run_model_in_parallel()


async def _start_satellite_services():
    microservice_connection = MicroserviceConnection()
    return await microservice_connection.activate_microservice()


async def _authentication_process(console_manager, auth_service_status):
    auth_command = AuthenticationCommand()
    token, username, auth_status = await AuthenticationCommand().process(auth_service_status)
    if auth_status is False or token is None:
        print(f"Authentication failed, process user {username} to guess mode.")
        _process_guess_mode()

    console_manager.authentication(username, info_log=("Authentication success."))        
    return token


def _process_guess_mode():
    # Create temporary user profile
    # Store in database
    # Crons job to delete temporary profile after 30 days
    # Delete all actions like tasks, schedules, etc.
    # Crons job check, if last access - created_at > 90 days, sugguess user to create new account, or delete all data
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
