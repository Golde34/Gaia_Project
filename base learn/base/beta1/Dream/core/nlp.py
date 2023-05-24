import re
import nltk
import logging


class NLP:

    def __init__(self):
        pass

    @staticmethod
    def is_positive_answer(answer):
        return answer in ['yes', 'y', 'oui', 'true']

    @staticmethod
    def is_negative_answer(answer):
        return answer in ['no', 'n']

    @staticmethod
    def create_parts_of_speech(text):
        tokens = nltk.word_tokenize(text)
        return nltk.pos_tag(tokens)

    @staticmethod
    def is_question_with_modal(parts_of_speech):
        grammar = 'QS: {<MD><PRP><VB>}'
        cp = nltk.RegexpParser(grammar)
        result = cp.parse(parts_of_speech)
        for subtree in result.subtrees():
            if subtree.label() in ['MD', 'WD', 'QS']:
                return True

    @staticmethod
    def is_question_with_inversion(parts_of_speech):
        grammar = 'QS: {<VBP><PRP>}'
        cp = nltk.RegexpParser(grammar)
        result = cp.parse(parts_of_speech)
        for subtree in result.subtrees():
            if subtree.label() in ['QS']:
                return True

    @staticmethod
    def _extract_verb(parts_of_speech):
        for part in parts_of_speech:
            if part[1] in ['VB']:
                return part[0]
        return ' '

    @staticmethod
    def _extract_modal(parts_of_speech):
        for part in parts_of_speech:
            if part[1] in ['MD']:
                return part[0]
        return ' '

    @staticmethod
    def _extract_noun(parts_of_speech):
        for part in parts_of_speech:
            if part[1] in ['NN', 'NNS', 'NNP', 'NNPS']:
                return part[0]
        return ' '


class ResponseCreator(NLP):
    def __init__(self):
        super().__init__()

    def create_positive_response(self, sentence):
        positive_response = self._create_response(sentence)
        if positive_response:
            return 'Yes, ' + positive_response

    def create_negative_response(self, sentence):
        negative_response = self._create_response(sentence)
        if negative_response:
            return 'No, ' + negative_response

    def _create_response(self, sentence):
        parts_of_speech = self.create_parts_of_speech(sentence)

        verb = self._extract_verb(parts_of_speech)
        modal = self._extract_modal(parts_of_speech)
        noun = self._extract_noun(parts_of_speech)

        if self.is_question_with_modal(parts_of_speech):
            logging.info('The user speech has a modal question')
            answer = 'I ' + modal + ' ' + verb + ' ' + noun
        elif self.is_question_with_inversion(parts_of_speech):
            logging.info('The user speech has an inverse question')
            answer = 'I ' + ' ' + verb + ' ' + noun
        else:
            logging.info('Unclassified user command..')
            answer = ''

        return re.sub('\s\s+', ' ', answer)