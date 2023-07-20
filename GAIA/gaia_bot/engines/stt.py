import speech_recognition as sr

import gaia_bot
from gaia_bot.configs.settings import DEFAULT_GENERAL_SETTINGS
from gaia_bot.engines.ltl import L2L

class STTEngine:
    def __init__(self, input_language, console_manager):
        super().__init__()
        self.console_manager = console_manager
        self.console_manager.console_output(info_log="Configuring Mic ...")
        self.recognizer = sr.Recognizer()
        self.recognizer.pause_threshold = 0.5
        self.microphone = sr.Microphone()
        self.console_manager.console_output(info_log="Microphone configured successfully!")
        self.input_language = input_language

    def recognize_input(self, already_activated=False):
        while True:
            print("Listening...")
            transcript = self._recognize_speech_from_mic()
            if already_activated or self._activation_name_exist(transcript):
                transcript = self._remove_activation(transcript)
                if self.input_language != 'en':
                    transcript = L2L(transcript, self.input_language, 'en')
                    return transcript

    def _recognize_speech_from_mic(self):
        with self.microphone as source:
            self.recognizer.adjust_for_ambient_noise(source)
            audio = self.recognizer.listen(source)

        try:
            transcript = self.recognizer.recognize_google(audio, language=DEFAULT_GENERAL_SETTINGS['input_language']).lower()
            self.console_manager.console_output(info_log=f"User said: {transcript}")
        except sr.UnknownValueError:
            transcript = ''
            self.console_manager.console_output(error_log='Unable to recognize speech', refresh_console=False)
        except sr.RequestError:
            transcript = ''
            self.console_manager.console_output(error_log="Google API was unreachable")
        return transcript

    @staticmethod
    def _activation_name_exist(transcript):
        if transcript:
            transcript_words = transcript.split()
            # TODO
            return bool(set(transcript_words).intersection(['GAIA']))
        else:
            return False

    @staticmethod
    def _remove_activation_word(transcript):
        # TODO
        transcript = transcript.replace('GAIA', '')
        return transcript