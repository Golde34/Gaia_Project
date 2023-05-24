import os
from playsound import playsound


def play_activation_sound():
    utils_dir = os.path.dirname(__file__)
    activation_soundfile = os.path.join(utils_dir, '..', 'resources\\music', "activation_sound.wav")
    playsound(activation_soundfile)