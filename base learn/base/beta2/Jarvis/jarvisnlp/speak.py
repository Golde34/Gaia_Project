import pyttsx3


def say(Text):
    engine = pyttsx3.init("sapi5")
    voices = engine.getProperty('voices')
    engine.setProperty('voices', voices[0].id)
    engine.setProperty('rate', 170)
    print(f"AI : {Text}")
    engine.say(text=Text)
    engine.runAndWait()



