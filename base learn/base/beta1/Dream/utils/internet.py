import requests

from Dream.core.console import ConsoleManager


def internet_connectivity_check(url='http://www.google.com/', timeout=2):
    console_manager = ConsoleManager()
    try:
        console_manager.console_output(info_log='Checking internet connection...')
        _ = requests.get(url, timeout=timeout)
        console_manager.console_output(info_log='Internet connection passed!')
        return True
    except requests.ConnectionError:
        console_manager.console_output(warn_log='No internet connection.')
        console_manager.console_output(warn_log='Skills with internet connection will not work')
        return False
