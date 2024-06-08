import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Dataset
import nltk

from model import SimpleNetwork
from data_loader import return_data
import config

prompt_all_words = []
response_all_words = []
tags = []
xy = [] # tag, prompt
xz = [] # tag, response

data = return_data(config=config)

def tokenize(sentence):
    return nltk.wordpunct_tokenize(sentence)

def bag_words(tokenized_sentence, words):
    bag = np.zeros(len(words), dtype=np.float32)

    for index, w in enumerate(words):
        if w in tokenized_sentence:
            bag[index] = 1

    return bag

for tag, prompt, response in zip(data['tag'], data['prompt'], data['response']):
    if tag not in tags:
        tags.append(tag)

    prompt_token = tokenize(prompt)
    response_token = tokenize(response)

    prompt_all_words.extend(prompt_token)
    response_all_words.extend(response_token)

    xy.append((prompt_token, tag))
    xz.append((response_token, tag))

prompt_all_words = sorted(set(prompt_all_words))
response_all_words = sorted(set(response_all_words))
tags = sorted(set(tags))

x_train = []
y_train = []

for (pattern_sentence, tag) in xy:
    bag = bag_words(pattern_sentence, prompt_all_words)
    x_train.append(bag)

    label = tags.index(tag)
    y_train.append(label)

x_train = np.array(x_train)
y_train = np.array(y_train)

num_epochs = 1000
batch_size = 4
learning_rate = 0.001
input_size = len(x_train[0])
hidden_size = 8
num_classes = len(tags)

print("training model...")


class ChatDataset(Dataset):
    def __init__(self):
        self.n_samples = len(x_train)
        self.x_data = x_train
        self.y_data = y_train

    def __getitem__(self, item):
        return self.x_data[item], self.y_data[item]

    def __len__(self):
        return self.n_samples


dataset = ChatDataset()

train_loader = DataLoader(dataset=dataset,
                          batch_size=batch_size,
                          shuffle=True,
                          num_workers=0)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = SimpleNetwork(input_size, hidden_size, num_classes).to(device=device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

for epoch in range(num_epochs):
    for (words, labels) in train_loader:
        words = words.to(device)
        labels = labels.to(dtype=torch.long).to(device)
        outputs = model(words)
        loss = criterion(outputs, labels)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    if (epoch+1) % 100 == 0:
        print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}")

print(f"Final loss: {loss.item():.4f}")

data = {
    "model_state": model.state_dict(),
    "input_size": input_size,
    "hidden_size": hidden_size,
    "num_classes": num_classes,
    "prompt_all_words" : prompt_all_words,
    "tags": tags
}

FILE = "TrainData.pth"
torch.save(data, FILE)

print("Saved file.")
