import os
import shutil

from __version__ import __version__


class OutputStyler:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    CYAN = '\033[36m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


DASH = '='
user_input = OutputStyler.CYAN + ':-$ ' + OutputStyler.ENDC


def headerize(text=DASH):
    result = shutil.get_terminal_size()

    terminal_length = result.columns
    #terminal_height = result.lines

    if text:
        text_length = len(text)
        remaining_places = int(terminal_length) - text_length
        if remaining_places > 0:
            return DASH * (remaining_places // 2 - 1) + ' ' + text + ' ' + DASH * (remaining_places // 2 - 1)
        else:
            return DASH * int(terminal_length)


def print_console_header(text=DASH):
    print(headerize(text))

dream_logo = "\n"\
            " ██████╗ ███████╗███████╗  ███═╗ ██═╗   █╗\n"\
            " ██   ██║██║  ██║██       █████╚╗███╚╗ ██║\n"\
            " ██   ██║██║ ██╔╝██      ██║  ██║██║█╚███║\n"\
            " ██   ██║████╔═╝ ██████║ ██║  ██║██║ █ ██║\n"\
            " ██   ██║██║██╗  ██      ███████║██║   ██║\n"\
            " ██   ██║██║ ██╗ ██      ██║  ██║██║   ██║\n"\
            " ██████╔╝██║  ██╗███████╗██║  ██║██║   ██║\n"\
            " ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝   ╚═╝\n"\

start_text = " - Golde's Dream Assistant Platform " + "v" + __version__ + " -"