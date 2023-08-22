from transformers import GPT2LMHeadModel, GPT2Tokenizer
from dataset import ChatData
from torch.optim import Adam
import torch
from torch.utils.data import DataLoader

from utils.gpu_print import print_gpu_utilization
from config import device, batch_size, learning_rate
from engine import train_engine
from tokenizer_config import gpt2_tokenizer
from finetune_gpt2_model import EntityModel


def train():
    tokenizer = gpt2_tokenizer

    model = EntityModel()
    model.gpt2.resize_token_embeddings(len(tokenizer))
    model = model.to(device)

    # print(tokenizer.decode(model.generate(**tokenizer("hey i was good at basketball but ",
    #                          return_tensors="pt"))[0]))

    chatData = ChatData("./chat_data.json", tokenizer)
    chatData = DataLoader(chatData, batch_size=batch_size)

    model.train()
    print_gpu_utilization()

    optim = Adam(model.parameters(), lr=learning_rate)

    print("training .... ")
    train_engine(chatData, model, optim)

def pretrained():
    tokenizer = gpt2_tokenizer

    model = EntityModel()
    model.gpt2.resize_token_embeddings(len(tokenizer))
    model = model.to(device)

    model.load_state_dict(torch.load('./model_state.pt'))
    model.eval()

    print(model)
