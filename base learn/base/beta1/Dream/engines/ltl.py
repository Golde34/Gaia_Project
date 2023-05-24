from googletrans import Translator


translator = Translator()

def L2L(text, from_l, to_l):
    return translator.translate(text, src=from_l,dest=to_l).text