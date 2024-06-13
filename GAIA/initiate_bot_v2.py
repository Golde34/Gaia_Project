import asyncio
import colorama
import threading
from concurrent.futures import ThreadPoolExecutor

from gaia_bot_v2.commands.authentication import AuthenticationCommand
from gaia_bot_v2.process.console_manager import ConsoleManager
from gaia_bot_v2.kernel.configs import settings
from gaia_bot_v2.kernel.utils import gpu_threads as gpu_utils
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
    response_model, response_tokenizer, detect_skill_model = await loop.run_in_executor(None, _startup_ai_model)
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
    models_result, count_models = _run_models_in_parallel(
        check_response=True, check_detect_skill=True
    )

    if count_models['response']==1:
        response_model, response_tokenizer = models_result[0]
    else:
        response_model, response_tokenizer = None, None
    if count_models['detect_skill']==1:
        detect_skill_model = models_result[1]
    else:
        detect_skill_model = None

    gpu_utils.check_gpu_memory()
    return response_model, response_tokenizer, detect_skill_model


def _run_models_in_parallel(check_response, check_detect_skill):
    count_models = {}
    with ThreadPoolExecutor(max_workers=2) as executor:
        futures = []
        if check_response:
            futures.append(executor.submit(get_model_and_tokenizer))
            count_models["response"] = 1

        if check_detect_skill:
            futures.append(executor.submit(get_detect_skill_model))
            count_models["detect_skill"] = 1

        results = [future.result() for future in futures]

    return results, count_models


def _start_satellite_services():
    pass


def _process_guess_mode(console_manager, assistant):
    pass


async def _initiate_gaia(
    console_manager,
    assistant,
    settings,
    token,
    services,
    response_model,
    response_tokenizer,
    detect_skill_model,
):
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
