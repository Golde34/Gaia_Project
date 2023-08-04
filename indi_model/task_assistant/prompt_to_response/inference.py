import random
import json
import torch
from model import SimpleNetwork
from prompt_to_response.utils.model_utils import bag_words, tokenize

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

FILE = "TrainData.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
num_classes = data["num_classes"]
all_words = data["prompt_all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = SimpleNetwork(input_size, hidden_size, num_classes).to(device)
model.load_state_dict(model_state)
model.eval()

# -------------
Name = "Gaia"


def Main():
    sentence = str(input())

    if sentence == "bye jarvis":
        exit()

    sentence = tokenize(sentence)
    X = bag_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)

    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]
    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    if prob.item() > 0.5:
        print(tag)

while True:
    Main()