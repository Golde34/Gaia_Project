import pandas as pd
import json


def process_data(file_path):
    df = pd.read_csv(file_path)
    
    spacy_data = []
    count = 0    

    for _, row in df.iterrows():
        sentence = row['text']
        entities = json.loads(row['entities'])

        ner_entities = []
        textcat_labels = {}

        for entity in entities:
            start = int(entity['start'])
            end = int(entity['end'])
            label = entity['label']

            if start == 0 and end == 0:
                textcat_labels[label] = 1
            else:
                ner_entities.append((start, end, label))

        annotation = {
            "entities": ner_entities,
            "cats": textcat_labels
        }

        count += 1
        spacy_data.append((sentence, annotation))

    return spacy_data, count
