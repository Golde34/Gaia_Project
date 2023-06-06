from __version__ import __version__
import colorama

from core.console_manager import ConsoleManager


def main():
    colorama.init()
    print(f"Gaia version: ${__version__}")
    # Startup
    console_manager = ConsoleManager()
    console_manager.wakeup(text="Hello bot, I'm available now",
                           info_log="Bot wakeup...",
                           refresh_console=True)

if __name__ == "__main__":
    main()