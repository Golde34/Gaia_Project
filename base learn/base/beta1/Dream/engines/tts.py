import queue
import logging
import pyttsx3
import threading

from Dream.core.console import ConsoleManager


class TTS:
    def __init__(self):
        self.tts_engine = self.set_voice_engine()

    def run_engine(self):
        try:
            self.tts_engine.runAndWait()
        except RuntimeError:
            pass

    @staticmethod
    def set_voice_engine():
        tts_engine = pyttsx3.init()
        tts_engine.setProperty('rate', 160)
        tts_engine.setProperty('volume', 1.0)
        return tts_engine

class TTSEngine(TTS):
    def __init__(self):
        super().__init__()
        self.logger = logging
        self.message_queue = queue.Queue(maxsize=15)
        self.stop_speaking = False
        self.console_manager = ConsoleManager()

    def assistant_response(self, message, refresh_console=True):
        self._insert_into_message_queue(message)
        try:
            speech_tread = threading.Thread(target=self._speech_and_console, args=(refresh_console,))
            speech_tread.start()
        except RuntimeError as e:
            self.logger.error('Error in assistant response thread with message {0}'.format(e))

    def _insert_into_message_queue(self, message):
        try:
            self.message_queue.put(message)
        except Exception as e:
            self.logger.error("Unable to insert message to queue with error message: {0}".format(e))

    def _speech_and_console(self, refresh_console):
        try:
            while not self.message_queue.empty():
                c_batch = ''
                message = self.message_queue.get()
                if message:
                    batches = self._create_text_batches(raw_text= message)
                    for batch in batches:
                        self.tts_engine.say(batch)
                        c_batch += batch
                        self.console_manager.console_output(c_batch, refresh_console=refresh_console)
                        self.run_engine()
                        if self.stop_speaking:
                            self.logger.debug('Speech interruption triggered')
                            self.stop_speaking = False
        except Exception as e:
            self.logger.error('Speech and console error message: {0}',format(e))

    @staticmethod
    def _create_text_batches(raw_text, batch_of_words=8):
        raw_text = raw_text + ' '
        list_of_batches = []
        total_words = raw_text.count(' ')
        letter_id = 0

        for split in range(0, int(total_words / batch_of_words)):
            batch = ''
            words_count = 0
            while words_count < batch_of_words:
                batch += raw_text[letter_id]
                if raw_text[letter_id] == ' ':
                    words_count += 1
                letter_id += 1
            list_of_batches.append(batch)

        if letter_id < len(raw_text):
            list_of_batches.append(raw_text[letter_id:])
        return list_of_batches