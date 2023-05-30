import distutils.spawn
import os
from platform import win32_ver
import sys
import warnings

from colorama import Fore

IS_WIN = sys.platform == 'win32'
WIN_VER = None
if IS_WIN:
    WIN_VER = win32_ver()[0]

def console_output(self, text, color=""):
    warnings.warn(DeprecationWarning)
    print(color + text + Fore.RESET)
    if self.enable_voice:
        self.speech.text_to_text(text)

# Function for printing user output
def critical(string):
    print(Fore.RED + string + Fore.RESET)

def error(string):
    critical(string)

def important(string):
    print(Fore.YELLOW + string + Fore.RESET)

def warning(string):
    important(string)

def info(string):
    print(Fore.BLUE + string + Fore.RESET)

def unsupported(platform, silent=False):
    def noop_wrapper(func):
        def wrapped(*args, **kwargs):
            if sys.platform == platform:
                if not silent:
                    print(
                        '{}Command is unsupported for platform `{}`{}'.format(
                            Fore.RED, sys.platform, Fore.RESET))
            else:
                func(*args, **kwargs)
        return wrapped
    return noop_wrapper

def executable_exists(name):
    binary_path = distutils.spawn.find_executable(name)
    return binary_path is not None and os.access(binary_path, os.X_OK)

def get_parent_directory(path):
    path = path.split('/')
    path.pop()
    destination = '/'.join(path)
    return destination