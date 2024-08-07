import utils.write_parquet.add_to_parquet as atp
from data_processing import DataProcessing
from torch.utils.data import Dataset
import numpy as np
import torch
import nltk

def data_loader(config):
    data = atp.load_parquet(config.DATA_PARQUET_FILE)
    return data

def return_data(config):
    data = data_loader(config=config)
    data = DataProcessing(data).pre_data
    return data

class DataPreprocessor:
    def __init__(self, data):
        self.data = data
        self.prompt_all_words = []
        self.response_all_words = []
        self.tags = []
        self.xy = []  # tag, prompt
        self.xz = []  # tag, response

    def tokenize(self, sentence):
        return nltk.wordpunct_tokenize(sentence)

    def bag_of_words(self, tokenized_sentence, words):
        bag = np.zeros(len(words), dtype=np.float32)
        for index, w in enumerate(words):
            if w in tokenized_sentence:
                bag[index] = 1
        return bag

    def preprocess(self):
        for tag, prompt, response in zip(self.data['tag'], self.data['prompt'], self.data['response']):
            if tag not in self.tags:
                self.tags.append(tag)
            prompt_token = self.tokenize(prompt)
            response_token = self.tokenize(response)
            self.prompt_all_words.extend(prompt_token)
            self.response_all_words.extend(response_token)
            self.xy.append((prompt_token, tag))
            self.xz.append((response_token, tag))

        self.prompt_all_words = sorted(set(self.prompt_all_words))
        self.response_all_words = sorted(set(self.response_all_words))
        self.tags = sorted(set(self.tags))

    def get_train_data(self):
        x_train = np.array([self.bag_of_words(sentence, self.prompt_all_words) for sentence, _ in self.xy])
        y_train = np.array([self.tags.index(tag) for _, tag in self.xy])
        return x_train, y_train

    def get_tags_and_words(self):
        return self.tags, self.prompt_all_words, self.response_all_words


class ChatDataset(Dataset):
    def __init__(self, x_data, y_data):
        self.x_data = x_data
        self.y_data = y_data
        self.n_samples = len(x_data)

    def __getitem__(self, index):
        return self.x_data[index], self.y_data[index]

    def __len__(self):
        return self.n_samples


class TextDataset(Dataset):
    def __init__(self, prompts, responses, labels, tokenizer, max_len):
        self.prompts = prompts
        self.responses = responses
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.prompts)

    def __getitem__(self, idx):
        text = f"{self.prompts[idx]} [SEP] {self.responses[idx]}"
        encoding = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=self.max_len,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt'
        )
        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'token_type_ids': encoding['token_type_ids'].flatten(),
            'labels': torch.tensor(self.labels[idx], dtype=torch.long)
        }


# if __name__ == '__main__':
#     data = data_loader(config=config)
#     data = DataProcessing(data).pre_data
#     print(data)