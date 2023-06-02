import os
import sys
import signal
import traceback
from cmd import Cmd
from functools import partial

from colorama import Fore


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
    

class CmdInterpreter(Cmd):
    def __init__(self, first_reaction_text,
                 prompt, directories=[], first_reaction=True):
        """
        Contains a dictionary with Gaia Actions 
        """
        Cmd.__init__(self)
        command = " ".join(sys.argv[1:]).strip()
        self.first_reaction = first_reaction
        self.first_reaction_text = ""
        self.prompt = ""

        # Register do_quit() function to SIGINT signal (Ctrl-C)
        signal.signal(signal.SIGINT, self.interrupt_handler)

    def close(self):
        # Stop the spinner if it is already running
        if self.api.is_spinner_running():
            self.api.spinner_stop('Some error has occured')

        self.say("Goodbye boss!")
        

    def interrupt_handler(self, signal, frame):
        self.close()