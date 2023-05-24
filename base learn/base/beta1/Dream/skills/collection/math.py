from word2number import w2n

from Dream.skills.skill import AssistantSkill
from Dream.utils.mapping import math_symbols_mapping

class MathSkill(AssistantSkill):

    @classmethod
    def do_calculations(cls, voice_transcript, **kwargs):
        number_transcript = cls._replace_with_numbers(voice_transcript)
        math_equation = cls._clear_transcript(number_transcript)
        try:
            result = str(eval(math_equation))
            cls.response(result)
        except Exception as e:
            cls.console_manager.console_output('Failed to eval the equation --> {0} with error message {1}'.format(math_equation, e))

    @classmethod
    def _replace_with_numbers(cls, transcript):
        number_transcript = ""
        for word in transcript.split():
            try:
                number = w2n.word_to_num(word)
                number_transcript += ' ' + str(number)
            except ValueError as e:
                number_transcript += ' ' + word
        return number_transcript

    @classmethod
    def _clear_transcript(cls, transcript):
        cleaned_transcript = ''
        for word in transcript.split():
            if word.isdigit() or word in math_symbols_mapping.values():
                cleaned_transcript += word
            else:
                cleaned_transcript += math_symbols_mapping.get(word, '')
        return cleaned_transcript