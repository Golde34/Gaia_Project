import os
import subprocess
import psutil
import logging

from Dream import settings
from Dream.utils.console_log import start_text, dream_logo, OutputStyler, headerize
from Dream.utils.mongoDB import db
from Dream.enumerations import MongoCollections, InputMode


class ConsoleManager:
    def __init__(self):
        pass

    def clear(self):
        subprocess.call('output reset' if os.name == 'posix' else 'cls', shell=True)

    def console_output(self, text='', debug_log=None, info_log=None, warn_log=None, error_log=None, refresh_console=True):
        if refresh_console is True:
            self.clear()

            self._stdout_print(dream_logo + start_text)
            self._stdout_print(" Note: CTRL + C if you want to Quit.")

            settings_documents = db.get_documents(collection=MongoCollections.GENERAL_SETTINGS.value)
            if settings_documents:
                settings_ = settings_documents[0]
                print(OutputStyler.HEADER + headerize('GENERAL INFO') + OutputStyler.ENDC)
                enabled = OutputStyler.GREEN + 'ENABLED' + OutputStyler.ENDC if settings_[
                    'response_in_speech'] else OutputStyler.WARNING + 'NOT ENABLED' + OutputStyler.ENDC
                print(OutputStyler.BOLD + 'ASSISTANT NAME: ' + OutputStyler.GREEN + '{0}'.format(
                    settings_['assistant_name'].upper() + OutputStyler.ENDC) + OutputStyler.ENDC)
                print(OutputStyler.BOLD + 'RESPONSE IN SPEECH: ' + enabled)
                print(OutputStyler.BOLD + 'INPUT MODE: ' + OutputStyler.GREEN + '{0}'.format(
                    settings_['input_mode'].upper() + OutputStyler.ENDC) + OutputStyler.ENDC)
                print(OutputStyler.BOLD + 'INPUT LANGUAGE: ' + OutputStyler.GREEN + '{0}'.format(
                    settings_['input_language'].upper() + OutputStyler.ENDC) + OutputStyler.ENDC)
                if settings_['input_mode'] == InputMode.VOICE.value:
                    print(OutputStyler.BOLD + 'NOTE: ' + OutputStyler.GREEN + "Include " + "'{0}'".format(settings_['assistant_name'].upper()) + " in you command to enable assistant" + OutputStyler.ENDC + OutputStyler.ENDC)

            print(OutputStyler.HEADER + headerize('SYSTEM') + OutputStyler.ENDC)
            print(OutputStyler.BOLD + 'RAM USAGE: {0:.2f} GB'.format(self._get_memory()) + OutputStyler.ENDC)

            if debug_log:
                logging.debug(debug_log)

            if info_log:
                logging.info(info_log)

            if warn_log:
                logging.warning(warn_log)

            if error_log:
                logging.error(error_log)

            MAX_NUMBER_OF_LOG_LINES = 25
            log_path = settings.ROOT_LOG_CONF['handlers']['file']['filename']
            actual_number_of_log_lines = 0

            myfile = open(log_path, "r")
            lines = ""
            myline = myfile.readline()
            lines += myline + '\n'
            while myline and actual_number_of_log_lines < MAX_NUMBER_OF_LOG_LINES:
                myline = myfile.readline()
                lines += myline + '\n'
                actual_number_of_log_lines += 1
            lines = lines[0:-2]
            myfile.close()

            # lines = subprocess.check_output(['tail', '-' + str(MAX_NUMBER_OF_LOG_LINES), log_path]).decode("utf-8")
            # actual_number_of_log_lines = len(lines)
            print(OutputStyler.HEADER + headerize(
                'LOG - {0} (Total Lines: {1})'.format(log_path, actual_number_of_log_lines)) + OutputStyler.ENDC)
            print(OutputStyler.BOLD + lines + OutputStyler.ENDC)

            print(OutputStyler.HEADER + headerize('ASSISTANT') + OutputStyler.ENDC)
            if text:
                print(OutputStyler.BOLD + '> ' + text + '\r' + OutputStyler.ENDC)
                print(OutputStyler.HEADER + headerize() + OutputStyler.ENDC)
        else:
            if text:
                print(OutputStyler.BOLD + text + '\r' + OutputStyler.ENDC)

    @staticmethod
    def _get_memory():
        pid = os.getpid()
        py = psutil.Process(pid)
        return py.memory_info()[0] / 2. ** 30

    @staticmethod
    def _stdout_print(text):
        print(OutputStyler.CYAN + text + OutputStyler.ENDC)