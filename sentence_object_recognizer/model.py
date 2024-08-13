MAX_SEQUENCE_LENGTH = 100


class SentenceObjectRecognizer():
    def __init__(self, model_path):
        self.model = SentenceObjectRecognizer.load_model(model_path)
        self.tokenizer = SentenceObjectRecognizer.load_tokenizer(model_path)

    @staticmethod
    def load_model(model_path):
        return load_model(model_path)

    @staticmethod
    def load_tokenizer(model_path):
        return load_tokenizer(model_path)

    def predict(self, sentence):
        sentence = self.tokenizer.texts_to_sequences([sentence])
        sentence = pad_sequences(sentence, maxlen=MAX_SEQUENCE_LENGTH)
        prediction = self.model.predict(sentence)
        return prediction

    def save(self, model_path):
        self.model.save(model_path)
        self.tokenizer.save(model_path)

def load_model(model_path):
    pass

def load_tokenizer(model_path):
    pass

def pad_sequences(sentence, maxlen):
    pass