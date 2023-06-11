from gaia_bot.model.bert.predict import predict, handle_input, predict_output
from gaia_bot.skills.assistant_skill import AssistantSkill


class ActivationSkills(AssistantSkill):

    @classmethod
    def predict(cls, text, **kwargs):
            token_sentence, sentence_list = handle_input(text)
            _tag, _pos, _token = predict(token_sentence, sentence_list)
            json_output = predict_output(_tag, _pos, _token)
            print(json_output)

            try:
                cls.response(str(json_output))
            except Exception as e:
                 cls.console_manager.console_output('Failed to predict sentence.')
