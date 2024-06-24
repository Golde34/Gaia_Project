import shutil
from colorama import Fore

from gaia_bot.kernel.configs.__version__ import __version__


class OutputStyler:
    HEADER = '\033[95m'
    BLUE = Fore.BLUE
    GREEN = Fore.GREEN
    CYAN = Fore.CYAN
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

DASH = '='
USER_INPUT = Fore.CYAN + '~> ' + OutputStyler.ENDC

def headerize(text = DASH):
    result = shutil.get_terminal_size()

    terminal_length = result.columns

    if text:
        text_length = len(text)
        remaining_places = int(terminal_length) - text_length
        if remaining_places > 0:
            output_places = remaining_places // 2 - 1
            output_dash = DASH * output_places
            return output_dash + ' ' + text + ' ' + output_dash
        else:
            return DASH * int(terminal_length)
        

def print_console_header(text=DASH):
    print(headerize(text))

dream_logo = "\n"\
            "  █████╗   ███═╗ ██║  ███═╗ \n"\
            " ██       █████╚╗██║ █████╚╗\n"\
            " ██      ██║  ██║██║██║  ██║\n"\
            " ██  ███║██║  ██║██║██║  ██║\n"\
            " ██   ██║███████║██║███████║\n"\
            " ██   ██║██║  ██║██║██║  ██║\n"\
            " ║█████╔╝██║  ██║██║██║  ██║\n"\
            " ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝\n"\

start_text = " - Golde's Dream Assistant Platform " + "v" + __version__ + " -"
            