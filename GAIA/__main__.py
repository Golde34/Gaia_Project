from gaia_bot.configs.__version__ import __version__
import colorama
from colorama import Fore

from gaia_bot.core.console_manager import ConsoleManager
from gaia_bot.skills.assistant_skill import AssistantSkill
from gaia_bot.skills.registry import SKILLS
from gaia_bot.core.processor import Processor
from gaia_bot.configs import settings

def simple_handle_testing(console_input):
    if console_input == "bye" or console_input == "off":
        boolean_loop = False
    else:
        boolean_loop = True
    
    return boolean_loop

def main():
    colorama.init()
    print(f"Gaia version: ${__version__}")
    # Startup
    console_manager = ConsoleManager()
    assistant = AssistantSkill()
    console_manager.wakeup(text="Hello boss, I'm available now",
                           info_log="Bot wakeup...",
                           refresh_console=True)
    # initiate
    _boolean_loop = True
    process = Processor(console_manager=console_manager, assistant=assistant,
                        settings=settings, skills=SKILLS)
    while _boolean_loop:
        console_manager.console_output(text="Listen your command",
                                       info_log="Listen command")
        # process
        process.run()
        # _boolean_loop = simple_handle_testing(i)

if __name__ == "__main__":
    main()