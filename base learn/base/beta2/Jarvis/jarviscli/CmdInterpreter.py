import os
import sys
import signal
import traceback
from cmd import Cmd
from functools import partial

from colorama import Fore

from utilities.animations import SpinnerThread
from utilities import schedule
from utilities.notification import notify
from utilities.voice import create_voice
from utilities.GeneralUtilities import get_parent_directory
from packages.memory.memory import Memory
from PluginManager import PluginManager


class JarvisAPI(object):
    _CONNECTION_ERROR_MSG = "You are not connected to Internet"

    def __init__(self, jarvis):
        # self.spinner = None
        self._jarvis = jarvis
        self.spinner_running = False

    def say(self, text, color="", speak=True):
        print(color + text + Fore.RESET, flush=True)
        if speak:
            self._jarvis.speak(text)

    def input(self, prompt="", color=""):
        # input() and color do not work on windows cmd
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

        self.say(JarvisAPI._CONNECTION_ERROR_MSG)

    def exit(self):
        # Immediately exit Jarvis
        self._jarvis.close()

    def notification(self, message, time_second=0):
        if isinstance(message, tuple):
            headline, msg = message
        elif isinstance(message, str):
            headline = "Jarvis"
            msg = message
        else:
            raise ValueError("Message is not a string or tuple")

        if time_second == 0:
            notify(headline, msg)
        else:
            schedule(time_second, notify, headline, msg)

    def schedule(self, time_seconds, function, *args):
        return self._jarvis.scheduler.create_event(
            time_seconds, function, self, *args
        )

    def cancel(self, schedule_id):
        spinner = SpinnerThread('Cancelling', 0.15)
        spinner.start()

        self._jarvis.scheduler.cancel(schedule_id)

        spinner.stop()
        self.say('Cancellation successful', Fore.GREEN)

    # Voice wrapper
    def enable_voice(self):
        g = self.get_data('gtts_status')
        self._jarvis.speech = create_voice(self, g, reate=125)
        self._jarvis.enable_voice = True
        self.update_data('enable_voice', True)

    def disable_gtts(self):
        self.update_data('gtts_status', False)

    def enable_gtts(self):
        self.update_data('gtts_status', True)
        g = self.get_data('gtts_status')
        self._jarvis.speech = create_voice(self, g, rate=120)

    def disable_voice(self):
        self.disable_gtts()
        self._jarvis.enable_voice = False
        self.update_data('enable_voice', False)

    def is_voice_enabled(self):
        return self._jarvis.enable_voice

    def change_speech_rate(self, delta):
        self._jarvis.speech.change_rate(delta)
        self.update_data('speech_rate', self._jarvis.speech.rate)

    # Memory
    def get_data(self, key):
        return self._jarvis.memory.get_data(key)

    def add_data(self, key, value):
        self._jarvis.memory.add_data(key, value)
        self._jarvis.memory.save()

    def update_data(self, key, value):
        self._jarvis.memory.update_data(key, value)
        self._jarvis.memory.save()

    def del_data(self, key):
        self._jarvis.memory.del_data(key)
        self._jarvis.memory.save()

    def eval(self, s):
        line = self._jarvis.precmd(s)
        stop = self._jarvis.onecmd(line)
        stop = self._jarvis.postcmd(stop, line)

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


def catch_all_exceptions(do, pass_self=True):
    def try_do(self, s):
        try:
            if pass_self:
                do(self, s)
            else:
                do(s)
        except Exception:
            if self._api.is_spinner_running():
                self.spinner_stop("It seems some error has occured")
            print(
                Fore.RED
                + "Some error occurred, please open an issue on github!")
            print("Here is error:")
            print('')
            traceback.print_exc()
            print(Fore.RESET)
    return try_do


class CmdInterpreter(Cmd):
    def __init__(self, first_reaction_text,
                 prompt, directories=[], first_reaction=True):
        Cmd.__init__(self)

    def __init__(
            self,
            first_reaction_text,
            prompt,
            directories=[],
            first_reaction=True):
        """
        This constructor contains a dictionary with Jarvis Actions (what Jarvis can do).
        In alphabetically order.
        """
        Cmd.__init__(self)
        command = " ".join(sys.argv[1:]).strip()
        self.first_reaction = first_reaction
        self.first_reaction_text = first_reaction_text
        self.prompt = prompt
        if (command):
            self.first_reaction = False
            self.first_reaction_text = ""
            self.prompt = ""
        # Register do_quit() function to SIGINT signal (Ctrl-C)
        signal.signal(signal.SIGINT, self.interrupt_handler)

        self.memory = Memory()
        self.scheduler = schedule.Schedule()
        self._api = JarvisAPI(self)
        self.say = self._api.say

        # Remember voice settings
        self.enable_voice = self._api.get_data('enable_voice')
        self.speech_rate = self._api.get_data('speech_rate')

        if not self.speech_rate:
            self.speech_rate = 120

        # what if the platform does not have any engines, travis doesn't have sapi5 acc to me

        try:
            gtts_status = self._api.get_data('gtts_status')
            self.speech = create_voice(
                self, gtts_status, rate=self.speech_rate)
        except Exception as e:
            self.say("Voice not supported", Fore.RED)
            self.say(str(e), Fore.RED)

        self.fixed_responses = {"what time is it": "clock",
                                "where am i": "pinpoint",
                                }

        self._plugin_manager = PluginManager()

        for directory in directories:
            self._plugin_manager.add_directory(directory)

        if (not command):
            self._init_plugin_info()
        self._activate_plugins()

        if self.first_reaction:
            self._api.say(self.first_reaction_text)

    def _init_plugin_info(self):
        plugin_status_formatter = {
            "disabled": len(self._plugin_manager.get_disabled()),
            "enabled": self._plugin_manager.get_number_plugins_loaded(),
            "red": Fore.RED,
            "blue": Fore.BLUE,
            "reset": Fore.RESET
        }

        plugin_status = "{red}{enabled} {blue}plugins loaded"
        if plugin_status_formatter['disabled'] > 0:
            plugin_status += " {red}{disabled} {blue}plugins disabled. More information: {red}status\n"
        plugin_status += Fore.RESET

        self.first_reaction_text += plugin_status.format(
            **plugin_status_formatter)

    def _activate_plugins(self):
        """Generate do_XXX, help_XXX and (optionally) complete_XXX functions"""
        for (plugin_name, plugin) in self._plugin_manager.get_plugins().items():
            self._plugin_update_completion(plugin, plugin_name)

            run_catch = catch_all_exceptions(plugin.run)
            setattr(
                CmdInterpreter,
                "do_"
                + plugin_name,
                partial(
                    run_catch,
                    self))
            setattr(
                CmdInterpreter,
                "help_" + plugin_name,
                partial(
                    self._api.say,
                    plugin.get_doc()))

            plugin.init(self._api)

    def _plugin_update_completion(self, plugin, plugin_name):
        """Return True if completion is available"""
        completions = [i for i in plugin.complete()]
        if len(completions) > 0:
            def complete(completions):
                def _complete_impl(self, text, line, begidx, endidx):
                    return [i for i in completions if i.startswith(text)]

                return _complete_impl

            setattr(
                CmdInterpreter,
                "complete_"
                + plugin_name,
                complete(completions))

    def get_api(self):
        return self._api

    def close(self):
        """Closing Jarvis."""

        '''Stop the spinner if it is already running'''
        if self._api.is_spinner_running():
            self._api.spinner_stop('Some error has occured')

        self.say("Goodbye, see you later!", Fore.RED)
        self.scheduler.stop_all()
        sys.exit()

    def execute_once(self, command):
        self.get_api().eval(command)
        sys.exit()

    def error(self):
        """Jarvis let you know if an error has occurred."""
        self.say("I could not identify your command...", Fore.RED)

    def interrupt_handler(self, signal, frame):
        """Closes Jarvis on SIGINT signal. (Ctrl-C)"""
        self.close()

    def do_status(self, s):
        """Prints plugin status status"""
        count_enabled = self._plugin_manager.get_number_plugins_loaded()
        count_disabled = len(self._plugin_manager.get_disabled())
        self.say(
            "{} Plugins enabled, {} Plugins disabled.".format(
                count_enabled,
                count_disabled))

        if "short" not in s and count_disabled > 0:
            self.say("")
            for disabled, reason in self._plugin_manager.get_disabled().items():
                self.say(
                    "{:<20}: {}".format(
                        disabled,
                        " OR ".join(reason)))

    def do_help(self, arg):
        if arg:
            Cmd.do_help(self, arg)
        else:
            self.say("")
            headerString = "These are valid commands for Jarvis"
            formatString = "Format: command ([aliases for command])"
            self.say(headerString)
            self.say(formatString, Fore.BLUE)
            pluginDict = self._plugin_manager.get_plugins()
            uniquePlugins = {}
            for key in pluginDict.keys():
                plugin = pluginDict[key]
                if (plugin not in uniquePlugins.keys()):
                    uniquePlugins[plugin.get_name()] = plugin
            helpOutput = []
            for name in sorted(uniquePlugins.keys()):
                if (name == "help"):
                    continue
                try:
                    aliasString = ", ".join(uniquePlugins[name].alias())
                    if (aliasString != ""):
                        pluginOutput = "* " + name + " (" + aliasString + ")"
                        helpOutput.append(pluginOutput)
                    else:
                        helpOutput.append("* " + name)
                except AttributeError:
                    helpOutput.append("* " + name)

            Cmd.columnize(self, helpOutput)

    def help_status(self):
        self.say("Prints info about enabled or disabled plugins")
        self.say("Use \"status short\" to omit detailed information.")