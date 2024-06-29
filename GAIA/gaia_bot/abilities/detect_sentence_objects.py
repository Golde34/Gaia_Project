from gaia_bot.models.bert import predict as detect_sentence


class DetectSentenceObjects():

    @classmethod
    def handle_input(cls, sentence):
        token_sentence, sentence_list = detect_sentence.handle_input(sentence)
        _tag, _pos, _token = detect_sentence.predict(token_sentence, sentence_list)
        json_output = detect_sentence.predict_output(_tag, _pos, _token)
        return json_output
    