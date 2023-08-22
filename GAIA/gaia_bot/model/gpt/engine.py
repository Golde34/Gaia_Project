import tqdm
import torch
from gaia_bot.model.gpt.config import device, epochs

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