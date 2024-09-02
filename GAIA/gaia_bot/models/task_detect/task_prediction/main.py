import spacy
from gaia_bot.models.task_detect.task_prediction.spacy_model import SpacyModel
from gaia_bot.models.task_detect.task_prediction.process_data import process_data
from gaia_bot.models.task_detect.task_prediction.config import MODEL_NAME, TRAIN_DATA, EPOCH, DROP


def train():
    train_data, count = process_data(TRAIN_DATA)
    print(f"Total number of training records: {count}")

    nlp = spacy.blank("en")
    ner = nlp.add_pipe("ner")
    textcat = nlp.add_pipe("textcat_multilabel", last=True) 

    for _, annotations in train_data:
        for ent in annotations.get("entities"):
            ner.add_label(ent[2])
    for _, annotations in train_data:
        for cat in annotations.get("cats"):
            textcat.add_label(cat)

    model = SpacyModel(nlp)
    model.train(train_data, n_iter=EPOCH, drop=DROP)
    nlp.to_disk(MODEL_NAME)


if __name__ == "__main__":
    print(f"Input (train/predict): ")
    input_value = str(input())
    if input_value == "train":
        train()
    elif input_value == "predict":
        text = str(input("Enter text: "))
        nlp = spacy.load(MODEL_NAME)
        doc = nlp(text)
        entities = [(ent.text, ent.start_char, ent.end_char, ent.label_) for ent in doc.ents]
        categories = {cat: score for cat, score in doc.cats.items()}
        print("Entities:", entities)
        print("Categories:", categories)