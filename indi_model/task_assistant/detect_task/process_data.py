import pandas as pd
import json


def process_data(file_path):
    df = pd.read_csv(file_path, delimiter=';', encoding='utf-8')

    spacy_data = []
    count = 0

    for _, row in df.iterrows():
        sentence = row['text']
        entities = json.loads(row['entities'])

        ner_entities = []
        textcat_labels = {}

        textcat_labels['GROUPTASK'] = ""
        textcat_labels['PRIORITY'] = ""
        textcat_labels['STATUS'] = ""

        for entity in entities:
            start = int(entity['start'])
            end = int(entity['end'])
            label = entity['label'].strip()
            value = entity.get('value', "")  

            if start == 0 and end == 0:
                if label in textcat_labels:
                    textcat_labels[label] = value 
            else:
                ner_entities.append((start, end, label))

        annotation = {
            "entities": ner_entities,  
            "cats": {  
                f"{label}_{value}": 1 if value else 0 for label, value in textcat_labels.items()
            }
        }

        count += 1
        spacy_data.append((sentence, annotation))

    return spacy_data, count
