import sys
import os

from colorama import Fore

from utils.animation import SpinnerThread
from utils.notification import notify
from utils import schedule
from utils.voice import create_voice
from utils.console import get_parent_directory


class GaiaAPI(object):
    _CONNECTION_ERROR_MESSAGE = "You are not connected to Internet"

    def __init__(self, bot):
        self.bot = bot
        self.spinner_running = False
    
    def say(self, text, color="", speak=True):
        print(color + text + Fore.RESET, flush=True)
        if speak:
            self.bot.speak(text)

    def input(self, prompt="", color=""):
        # input and color do not work on windows cmd
        sys.stdout.write(color + prompt + Fore.RESET)
        sys.stdout.flush()
        text = sys.stdin.readline()
        return text.rstrip()
    
    def input_number(self, prompt="", color="", rtype=float, rmin=None, rmax=None):
        while True:
            try:
                value = rtype(self.input(prompt=prompt, color=color).replace(',', '.'))
                if (rmin is not None and value < rmin) or (rmax is not None and value > rmax):
                    prompt = "Sorry, needs to be between {} and {}.Try again: ".format(rmin, rmax)
                else:
                    return value
            except ValueError:
                prompt = "Sorry, needs to be a number.Try again: "
                continue
    
    def connection_server(self):
        if self.is_spinner_running:
            self.spinner_stop('')
        
        self.say(GaiaAPI._CONNECTION_ERROR_MESSAGE)

    def exit(self):
        self.bot.close()

    def eval(self, s):
        line = self.bot.precmd(s)
        stop = self.bot.onecmd(line)
        stop = self.bot.postcmd(stop, line)

    # Spinner
    def is_spinner_running(self):
        return self.spinner_running

    def spinner_start(self, message="Starting"):
        self.spinner_running = True
        self.spinner = SpinnerThread(message, 0.15)
        self.spinner.start()

    def spinner_stop(self, message="Task executed successfully! ", color=Fore.GREEN):
        self.spinner.stop()
        self.say(message, color)
        self.spinner_running = False

    # Schedule Action
    def notification(self, message, time_second=0):
        if isinstance(message, tuple):
            headline, msg = message
        elif isinstance(message, str):
            headline = "Gaia"
            msg = message
        else:
            raise ValueError("Message is not a string or tuple")
        
        if time_second == 0:
            notify(headline, msg)
        else:
            schedule(time_second, notify, headline, msg)

    def schedule(self, time_seconds, function, *args):
        return self.bot.scheduler.create_event(
            time_seconds, function, self, *args
        )
    
    def cancel(self, schedule_id):
        spinner = SpinnerThread('Cancelling', 0,15)
        spinner.start()

        self.bot.scheduler.cancel(schedule_id)

        spinner.stop()
        self.say('Cancellation succesful', Fore.GREEN)

    # Voice wrapper
    def enable_voice(self):
        gtts_status = self.get_data
        self.bot.speech = create_voice(self, gtts_status, rate=125)
        self.bot.enable_voice = True
        self.update_data('enable_voice', True)
    
    def disable_gtts(self):
        self.update_data('gtts_status', False)

    def enable_gtts(self):
        self.update_data('gtts_status', True)
        gtts_status = self.get_data('gtts_status')
        self.bot.speech = create_voice(self, gtts_status, rate=120)

    def disable_voice(self):
        self.disable_gtts()
        self.bot.enable_voice = False
        self.update_data('enable_voice', False)
    
    def is_voice_enabled(self):
        return self.bot.enable_voice
    
    def change_speech_rate(self, delta):
        self.bot.speech.change_rate(delta)
        self.update_data('speech_rate', self.bot.speech.rate)

    # Data Memory
    def get_data(self, key):
        return self.bot.memory.get_data(key)
    
    def add_data(self, key, value):
        self.bot.memory.add_data(key, value)
        self.bot.memory.save()

    def update_data(self, key, value):
        self.bot.memory.update_data(key, value)
        self.bot.memory.save()

    def delete_data(self, key):
        self.bot.memory.del_data(key)
        self.bot.memory.save()

    # Directory
    def get_saving_directory(self, path):
        while True:
            user_choice = self.input(
                'Would you like to save the file in the same folder?[y/n] '
            )
            user_choice = user_choice.lower()

            if user_choice == 'yes' or user_choice == 'y':
                destination = get_parent_directory(path)
                break
            elif user_choice == 'no' or user_choice == 'n':
                destination = self.input('Enter the folder destination: ')
                if not os.path.exists(destination):
                    os.makedirs(destination)
                break
            else:
                self.incorrect_option()

        os.chdir(destination)
        return destination

    def incorrect_option(self):
        self.say("Oops! Looks like you entered an incorrect option", Fore.RED)
        self.say("Look at the options once again:", Fore.GREEN)
