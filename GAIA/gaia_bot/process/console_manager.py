import os
import logging

from colorama import Fore

from gaia_bot.kernel.utils.console_log import start_text, OutputStyler, headerize
from gaia_bot.kernel.configs import settings


class ConsoleManager:

    def __init__(self) -> None:
        pass

    def wakeup(self, text="", info_log=None, refresh_console=None, services=None):
        if refresh_console is True:
            self._clear()

            self._stdout_print(start_text)
            self._stdout_print(" Note: CTRL+C if you weant to quit GAIA console.")

            if info_log:
                logging.info(info_log)

            self._logging_file()

            print(OutputStyler.HEADER + headerize("ASSISTANT") + OutputStyler.ENDC)
            if text:
                print(OutputStyler.BOLD + "> " + text + "\r" + OutputStyler.ENDC)

                print(OutputStyler.HEADER + headerize("SERVICES") + OutputStyler.ENDC)
                print(OutputStyler.CYAN + "You can access these services" + OutputStyler.ENDC)
                for service in services:
                    for key, value in service.items():
                        if str(value) == "ACTIVE":
                            print(OutputStyler.GREEN + "> " + key + ": " + str(value) + "\r" + OutputStyler.ENDC)        
                        else:
                            print(OutputStyler.FAIL + "> " + key + ": " + str(value) + "\r" + OutputStyler.ENDC)
                print(OutputStyler.HEADER + headerize("AUTHENTICATION") + OutputStyler.ENDC)
        else:
            if text:
                print(OutputStyler.BOLD + text + "\r" + OutputStyler.ENDC)

    def authentication(self, username, token, info_log=None, error_log=None):
        if info_log:
            logging.info(info_log)
        if error_log:
            logging.error(error_log)

        print(OutputStyler.CYAN + "Authentication successful" + OutputStyler.ENDC)
        print(OutputStyler.BOLD + "> Username: " + username + "\r" + OutputStyler.ENDC)
        print(OutputStyler.BOLD + "> Token: " + token + "\r" + OutputStyler.ENDC)
        print(OutputStyler.HEADER + headerize() + OutputStyler.ENDC)

    def console_output(self,
        text="",
        info_log=None,
        error_log=None,
        warning_log=None,
        debug_log=None,
        refresh_console=False,
    ):
        self._console_written(text, info_log, error_log, warning_log, debug_log, 
                              refresh_console, output_styler=OutputStyler.CYAN)
        # print(OutputStyler.CYAN + text + OutputStyler.ENDC)

    def gaia_output(self,
        text="",
        info_log=None,
        error_log=None,
        warning_log=None,
        debug_log=None,
        refresh_console=False,
    ):
        self._console_written(text, info_log, error_log, warning_log, debug_log, 
                              refresh_console, output_styler=OutputStyler.BOLDGREEN)
        # print(OutputStyler.BOLDGREEN + text + OutputStyler.ENDC)

    @staticmethod
    def console_log(
        info_log=None,
        error_log=None,
        warning_log=None,
        debug_log=None,
    ):
        if info_log:
            logging.info(info_log)
        if debug_log:
            logging.debug(debug_log)
        if error_log:
            logging.error(error_log)
        if warning_log:
            logging.warning(warning_log)

    @staticmethod
    def _console_written(
        text="",
        info_log=None,
        error_log=None,
        warning_log=None,
        debug_log=None,
        refresh_console=False,
        output_styler=None
    ):
        if info_log:
            logging.info(info_log)
        if debug_log:
            logging.debug(debug_log)
        if error_log:
            logging.error(error_log)
        if warning_log:
            logging.warning(warning_log)
             
        print(output_styler + text + OutputStyler.ENDC)
    
    @staticmethod
    def _clear():
        clear = lambda: os.system("clear" if os.name == "posix" else "cls")
        return clear()

    @staticmethod
    def _stdout_print(text):
        print(Fore.CYAN + text + Fore.MAGENTA)

    @staticmethod
    def _logging_file():
        MAX_NUMBER_OF_LOG_LINES = 100
        log_path = settings.ROOT_LOG_CONFIG["handlers"]["file"]["filename"]
        actual_number_of_log_lines = 0

        gaia_file = open(log_path, "r", encoding="utf-8")
        lines = ""
        current_line = gaia_file.readline()
        lines += current_line + "\n"

        while current_line and actual_number_of_log_lines < MAX_NUMBER_OF_LOG_LINES:
            current_line = gaia_file.readline()
            lines += current_line + "\n"
            actual_number_of_log_lines += 1

        lines = lines[0:-2]
        gaia_file.close()

        print(
            OutputStyler.HEADER
            + headerize(
                "LOG - {0} (Total Lines: {1})".format(
                    log_path, actual_number_of_log_lines
                )
            )
            + OutputStyler.ENDC
        )
        print(OutputStyler.BOLD + lines + OutputStyler.ENDC)
