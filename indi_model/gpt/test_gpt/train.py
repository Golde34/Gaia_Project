from transformers import GPT2LMHeadModel, GPT2Tokenizer
from dataset import ChatData
from torch.optim import Adam
from torch.utils.data import DataLoader

from utils.gpu_print import print_gpu_utilization
from config import device
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
    chatData = DataLoader(chatData, batch_size=1)

    model.train()
    print_gpu_utilization()

    optim = Adam(model.parameters(), lr=1e-3)

    print("training .... ")
    train_engine(chatData, model, optim)