import logging

from gaia_bot.infrastructure.engines.ltl import L2L
from gaia_bot.kernel.utils.console_log import USER_INPUT


class TTTEngine:
    def __init__(self, console_manager, input_language):
        self.logger = logging
        self.console_manager = console_manager
        self.input_language = input_language

    def recognize_input(self, **kwargs):
        try:
            text_transcript = input(USER_INPUT).lower()
            while text_transcript == '':
                text_transcript = input(USER_INPUT).lower()
                if self.input_language != 'en':
                    text_transcript = L2L(text_transcript, self.input_language, 'en')
            return text_transcript
        except EOFError as e:
            self.console_manager.console_output(error_log='Failed to recognize uer input with message {0}'.format(e))

    def assistant_response(self, message, refresh_console=False):
        try:
            if message:
                self.console_manager.console_output(message, refresh_console=refresh_console)
        except RuntimeError as e:
            self.console_manager.console_output(error_log='Error in assistant response with message: {0}'.format(e))