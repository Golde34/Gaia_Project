from gaia_bot.__version__ import __version__
import colorama
from colorama import Fore

from gaia_bot.core.console_manager import ConsoleManager

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
    console_manager.wakeup(text="Hello boss, I'm available now",
                           info_log="Bot wakeup...",
                           refresh_console=True)
    _boolean_loop = True
    while _boolean_loop:
        print(Fore.CYAN + "Listen command" + Fore.MAGENTA)
        i = str(input())
        print(Fore.CYAN + "Handle input" + Fore.MAGENTA)
        _boolean_loop = simple_handle_testing(i)

if __name__ == "__main__":
    main()