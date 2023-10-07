import random
import json
import torch
from gaia_bot.models.task_detect.prompt_to_response.model import SimpleNetwork
from gaia_bot.models.task_detect.prompt_to_response.utils.model_utils import bag_words, tokenize
from gaia_bot.models.task_detect.prompt_to_response.config import MODEL_PATH

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

data = torch.load(MODEL_PATH)

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

def infer(sentence):

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
        return tag