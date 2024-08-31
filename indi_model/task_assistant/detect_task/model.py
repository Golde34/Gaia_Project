import spacy
from spacy.training import Example
from spacy.util import minibatch, compounding
from spacy.pipeline import EntityRuler
from spacy.tokens import DocBin
import random

nlp = spacy.blank("en")
ner = nlp.add_pipe("ner", source=nlp)
textcat = nlp.add_pipe("textcat", source=nlp)

ner_labels = ["PROJECT", "GROUPTASK", "TASK", "STARTDATE", "DEADLINE"]  # Những label NER
textcat_labels = ["PRIORITY:STAR", "PRIORITY:HIGH", "PRIORITY:MEDIUM", "PRIORITY:LOW", 
                  "STATUS:PENDING", "STATUS:IN_PROGRESS", "STATUS:DONE", 
                  "STARTDATE", "DEADLINE"]  # Những label textcat

# Thêm các label cho NER
for label in ner_labels:
    ner.add_label(label)

# Thêm các label cho textcat
for label in textcat_labels:
    textcat.add_label(label)

# Dữ liệu huấn luyện mẫu
TRAIN_DATA = [
    (
        "Please set a task in the Artemis project, about creating a user feedback system. This is an important task but not urgent.",
        {"entities": [(25, 32, "PROJECT"), (48, 79, "GROUPTASK")], 
         "cats": {"PRIORITY:MEDIUM": 1, "STATUS:PENDING": 1}}
    ),
    (
        "Create task to verify database integrity after recent updates. This is a star priority.",
        {"entities": [(15, 20, "TASK")], 
         "cats": {"PRIORITY:STAR": 1}}
    ),
    # Thêm các ví dụ huấn luyện khác ở đây...
]

# Huấn luyện model
optimizer = nlp.begin_training()

for i in range(20):  # Số epoch huấn luyện
    random.shuffle(TRAIN_DATA)
    losses = {}
    batches = minibatch(TRAIN_DATA, size=compounding(4.0, 32.0, 1.001))
    for batch in batches:
        for text, annotations in batch:
            doc = nlp.make_doc(text)
            example = Example.from_dict(doc, annotations)
            nlp.update([example], losses=losses, drop=0.5, sgd=optimizer)
    print(f"Epoch {i+1}: Losses: {losses}")

# Lưu model
nlp.to_disk("ner_textcat_model")

# Load lại model và kiểm tra
nlp2 = spacy.load("ner_textcat_model")

# Kiểm tra một ví dụ mới
doc = nlp2("Please add a task to set up automated testing for backend services.")
print("Entities", [(ent.text, ent.label_) for ent in doc.ents])
print("Categories", doc.cats)