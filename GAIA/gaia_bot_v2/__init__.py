from logging import config

from gaia_bot_v2.domain.enums import InputMode
from gaia_bot_v2.kernel.configs.settings import ROOT_LOG_CONFIG, DEFAULT_GENERAL_SETTINGS
from gaia_bot_v2.process.engines import stt, tts, ttt
from gaia_bot_v2.process.console_manager import ConsoleManager


config.dictConfig(ROOT_LOG_CONFIG)

with open(ROOT_LOG_CONFIG['handlers']['file']['filename'], 'w') as f:
    f.close()

assistant_name = DEFAULT_GENERAL_SETTINGS['assistant_name']
input_mode = DEFAULT_GENERAL_SETTINGS['input_mode']
input_language = DEFAULT_GENERAL_SETTINGS['input_language']
response_in_speech = DEFAULT_GENERAL_SETTINGS['response_in_speech']

console_manager = ConsoleManager()

input_engine = stt.STTEngine(input_language=input_language, console_manager=console_manager) \
    if input_mode == InputMode.VOICE.value else ttt.TTTEngine(input_language=input_language, console_manager=console_manager)
output_engine = tts.TTSEngine() if response_in_speech else ttt.TTTEngine(input_language=input_language, console_manager=console_manager)