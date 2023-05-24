import pyttsx3
import pygame as pg


class Engine(object):

    def __init__(self):
        self.is_busy = False
        self.engine = pyttsx3.init()
        self.set_speak_rate()
        self.set_speak_voice()
        self.set_speak_volumn()

    def set_speak_rate(self, rate=200):
        self.engine.setProperty("rate", rate)

    def set_speak_voice(self, s=1):
        voice = self.engine.getProperty("voices")
        self.engine.setProperty("voice", voice[s].id)

    def set_speak_volumn(self, vl=0.5):
        self.engine.setProperty('volume', vl)

    def text_to_speech(self, text):
        if self.is_busy:
            pass
        else:
            self.is_busy = True
            try:
                self.engine.say(text)
                self.engine.runAndWait()
            except:
                pass
            self.is_busy = False