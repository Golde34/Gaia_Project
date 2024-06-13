import asyncio
import colorama
import gaia_bot_v2.models.alpaca
import torch
from gaia_bot_v2.commands.authentication import AuthenticationCommand
from gaia_bot_v2.process.console_manager import ConsoleManager
from gaia_bot_v2.kernel.configs import settings
from gaia_bot_v2.process.assistant_skill import AssistantSkill
from gaia_bot_v2.process.processor import Processor
from gaia_bot_v2.models.alpaca.inference import get_model_and_tokenizer
from gaia_bot_v2.models.task_detect.prompt_to_response.inference import get_detect_skill_model


async def process_bot_v2():
    # Initiate bot console
    colorama.init()
    print(f"Gaia version: 2.0.0")
    # Startup
    loop = asyncio.get_event_loop()
    console_manager, assistant = await loop.run_in_executor(None, _startup)
    response_model, response_tokenizer, detect_skill_model = await loop.run_in_executor(
        None, _startup_ai_model
    )
    services = await loop.run_in_executor(None, _start_satellite_services)
    # Authen user
    # token = await AuthenticationCommand().process()
    # if token == None:
    #     print("Authentication failed, process user to guess mode.")
    #     _process_guess_mode(console_manager, assistant)
    # print("Authentication success, initiate Gaia.")
    # print("Your gaia authen token: ", token)
    # print("You can access these services: ", services)
    # Initiate
    token = "token"
    print(console_manager)
    await _initiate_gaia(
        console_manager=console_manager,
        assistant=assistant,
        settings=settings,
        token=token,
        services=services,
        response_model=response_model,
        response_tokenizer=response_tokenizer,
        detect_skill_model=detect_skill_model,
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


def _startup_ai_model():
    response_model, response_tokenizer = get_model_and_tokenizer()
    detect_skill_model = get_detect_skill_model()
    return response_model, response_tokenizer, detect_skill_model


def _start_satellite_services():
    pass


def _process_guess_mode(console_manager, assistant):
    pass


async def _initiate_gaia(console_manager, assistant, settings, token, services, response_model, response_tokenizer, detect_skill_model):
    boolean_loop = True
    process = Processor(
        console_manager=console_manager,
        assistant=assistant,
        settings=settings,
        response_model=response_model,
        response_tokenizer=response_tokenizer,
        detect_skill_model=detect_skill_model,
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
