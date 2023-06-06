import os
import subprocess
import logging

from colorama import Fore

class ConsoleManager:

    def __init__(self) -> None:
        pass

    def wakeup(self, text='', info_log=None, refresh_console=None):
        if refresh_console is True:
            self.clear()

            self._stdout_print('+++++ GAIA +++++')
            self._stdout_print(" Note: CTRL+C if you weant to quit GAIA console.")

            if info_log:
                logging.info(info_log)
            
            if text:
                print(Fore.CYAN + '> ' + text + '\r' + Fore.MAGENTA)
        else:
            if text:
                print(Fore.CYAN + text + '\r' + Fore.MAGENTA)

    def clear(self):
        subprocess.call('output reset' if os.name == 'posix' else 'cls', shell=True)

    @staticmethod
    def _stdout_print(text):
        print(Fore.CYAN + text + Fore.MAGENTA)