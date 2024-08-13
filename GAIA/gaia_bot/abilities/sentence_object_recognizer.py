from gaia_bot.models.bert import predict as detect_sentence


class SOR():

    @classmethod
    def handle_input(cls, sentence):
        token_sentence, sentence_list = detect_sentence.handle_input(sentence)
        _tag, _pos, _token = detect_sentence.predict(token_sentence, sentence_list)
        json_output = detect_sentence.predict_output(_tag, _pos, _token)
        return json_output
    
    @classmethod
    def call_detect_sentence_api(cls, sentence):
        return {
            'title': sentence,
            'description': 'Example description',
            'priority': 'High',
            'status': 'To Do',
            'startDate': '2024-08-10',
            'deadline': '2024-08-11',
            'duration': '8',
            'groupTaskId': 'abc',
            'activeStatus': 'ACTIVE'
            # 'tag': 'Example'
        }
    
    