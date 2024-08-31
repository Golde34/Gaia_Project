from spacy.training import Example
import random


class SpacyModel:
    def __init__(self, nlp):
        self.nlp = nlp
        self.optimizer = nlp.begin_training()

    def train(self, train_data, n_iter, drop=0.5):
        for i in range(n_iter):
            random.shuffle(train_data)
            losses = {}
            for text, annotation in train_data:
                doc = self.nlp.make_doc(text)
                example = Example.from_dict(doc, annotation)
                self.nlp.update([example], drop=drop, losses=losses, sgd=self.optimizer)
            print(f"Epoch {i+1}, Losses: {losses}")

    def predict(self, text):
        doc = self.nlp(text)
        print("Entities: ", [(ent.text, ent.label_) for ent in doc.ents])
        print("Categories: ", doc.cats)
        return [(ent.text, ent.label_) for ent in doc.ents], doc.cats
    