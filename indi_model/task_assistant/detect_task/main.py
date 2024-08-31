import spacy
from spacy_model import SpacyModel
from process_data import process_data

def train():
    train_data, count = process_data('spacy_dataset.csv')
    print(f"Total number of training records: {count}")

    nlp = spacy.blank('en')
    ner = nlp.create_pipe('ner')
    textcat = nlp.add_pipe('textcat_multilabel', last=True)

    for _, annotations in train_data:
        for ent in annotations.get('entities'):
            ner.add_label(ent[2])
        for label in annotations.get('cats'):
            textcat.add_label(label)

    model = SpacyModel(nlp)
    model.train(train_data, n_iter=50, drop=0.5)

    # Save model
    nlp.to_disk('task_detection_model')


if __name__ == "__main__":
    print(f"Input (train/predict): ")
    input_value = str(input())
    if input_value == "train":
        train()
    elif input_value == "predict":
        text = str(input("Enter text: "))
        nlp = spacy.load('task_detection_model')
        model = SpacyModel(nlp)
        model.predict(text)