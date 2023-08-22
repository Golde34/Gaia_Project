import tqdm
import torch
from config import device
from finetune_gpt2_model import EntityModel
from config import epochs

def train_engine(chatData, model, optim):

    for i in tqdm.tqdm(range(epochs)):
        for X, a in chatData:
            X = X.to(device)
            a = a.to(device)
            
            optim.zero_grad()
            loss = model.gpt2(X, attention_mask=a, labels=X).loss
            loss.backward()
            optim.step()
 
        torch.save(model.state_dict(), "model.pt")

    print(model)