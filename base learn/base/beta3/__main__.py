import gaia
import colorama
import sys

from __version__ import __version__

def check_python_version():
    return sys.version_info[0] == 3

def main():
    # enable color on windows
    colorama.init()
    # start Gaia
    print(f"Gaia version: {__version__}")
    bot = gaia.Gaia()
    command = " ".join(sys.argv[1:]).strip()
    bot.executor(command)


if __name__ == '__main__':
    if check_python_version():
        main()
    else:
        print("Sorry! Gaia run in Python 3 supported environment.")