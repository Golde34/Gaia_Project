import os
from gaia_bot.model.bert.predict import predict, handle_input, predict_output
from gaia_bot.skills.assistant_skill import AssistantSkill

class DefaultSkill(AssistantSkill):

    def __init__(self):
        pass

    @classmethod
    def detect_sentence_object(cls, text):
        token_sentence, sentence_list = handle_input(text)
        _tag, _pos, _token = predict(token_sentence, sentence_list)
        json_output = predict_output(_tag, _pos, _token)

        try:
            cls.response(str(json_output))
        except Exception as e:
            cls.console_manager.console_output('Failed to predict sentence.')
