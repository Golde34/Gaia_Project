import torch
from torch.utils.data import DataLoader
from torch import nn
from transformers import AdamW
from model import SimpleNetwork, BertClassifier
from data_loader import ChatDataset

class SimpleNNTrainer:
    def __init__(self, input_size, hidden_size, num_classes, learning_rate, num_epochs, batch_size):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = SimpleNetwork(input_size, hidden_size, num_classes).to(self.device)
        self.criterion = nn.CrossEntropyLoss()
        self.optimizer = torch.optim.Adam(self.model.parameters(), lr=learning_rate)
        self.num_epochs = num_epochs
        self.batch_size = batch_size

    def train(self, x_train, y_train):
        dataset = ChatDataset(x_train, y_train)
        train_loader = DataLoader(dataset, batch_size=self.batch_size, shuffle=True, num_workers=0)

        for epoch in range(self.num_epochs):
            for words, labels in train_loader:
                words, labels = words.to(self.device), labels.to(dtype=torch.long).to(self.device)
                outputs = self.model(words)
                loss = self.criterion(outputs, labels)
                self.optimizer.zero_grad()
                loss.backward()
                self.optimizer.step()

            if (epoch + 1) % 100 == 0:
                print(f"Epoch [{epoch + 1}/{self.num_epochs}], Loss: {loss.item():.4f}")

        print(f"Final loss: {loss.item():.4f}")

    def save_model(self, file_path, input_size, hidden_size, num_classes, prompt_all_words, tags):
        data = {
            "model_state": self.model.state_dict(),
            "input_size": input_size,
            "hidden_size": hidden_size,
            "num_classes": num_classes,
            "prompt_all_words": prompt_all_words,
            "tags": tags
        }
        torch.save(data, file_path)
        print("Saved simple neural network model.")


class BERTTrainer:
    def __init__(self, num_classes, learning_rate, num_epochs, batch_size):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = BertClassifier(num_classes=num_classes).to(self.device)
        self.criterion = nn.CrossEntropyLoss()
        self.optimizer = AdamW(self.model.parameters(), lr=learning_rate)
        self.num_epochs = num_epochs
        self.batch_size = batch_size

    def train(self, train_loader):
        self.model.train()
        for epoch in range(self.num_epochs):
            for batch in train_loader:
                input_ids = batch['input_ids'].to(self.device)
                attention_mask = batch['attention_mask'].to(self.device)
                token_type_ids = batch['token_type_ids'].to(self.device)
                labels = batch['labels'].to(self.device)

                self.optimizer.zero_grad()
                outputs = self.model(input_ids, attention_mask, token_type_ids)
                loss = self.criterion(outputs, labels)
                loss.backward()
                self.optimizer.step()

            if (epoch + 1) % 100 == 0:
                print(f"Epoch [{epoch + 1}/{self.num_epochs}], Loss: {loss.item():.4f}")

        print(f"Final loss: {loss.item():.4f}")

    def save_model(self, file_path, input_size, hidden_size, num_classes, prompt_all_words, tags):
        data = {
            "model_state": self.model.state_dict(),
            "input_size": input_size,
            "hidden_size": hidden_size,
            "num_classes": num_classes,
            "prompt_all_words": prompt_all_words,
            "tags": tags
        }
        torch.save(data, file_path)
        print("Saved BERT model.")

