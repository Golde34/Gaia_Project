import os
import sys
import signal
import traceback
from cmd import Cmd
from functools import partial

from colorama import Fore

from core.gaia_action import GaiaAPI
from packages.memory_cache.memory import Memory
from utils import schedule
from utils.voice import create_voice
from core.plugin_manager import PluginManager


class CmdInterpreter(Cmd):

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
        self._api = GaiaAPI(self)
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

            run_catch = self.catch_all_exceptions(plugin.run)
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