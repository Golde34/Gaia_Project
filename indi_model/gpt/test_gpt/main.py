from transformers import GPT2LMHeadModel, GPT2Tokenizer
from ChatData import ChatData
from torch.optim import Adam
from torch.utils.data import DataLoader
import tqdm
import torch


def train(chatData, model, optim):

    epochs = 12

    for i in tqdm.tqdm(range(epochs)):
        for X, a in chatData:
            X = X.to(device)
            a = a.to(device)
            optim.zero_grad()
            loss = model(X, attention_mask=a, labels=X).loss
            loss.backward()
            optim.step()
        torch.save(model.state_dict(), "model_state.pt")
            
def inference(_input):
    _input = "<startofstring> " + _input + " <bot>: "
    encoded_input = tokenizer(_input)
    output = model.generate(**encoded_input)
    return tokenizer.decode(output[0])

device = "cpu"

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
tokenizer.add_special_tokens({
    "pad_token": "<pad>",
    "bos_token": "<startofstring>",
    "eos_token": "<endofstring>"
})
tokenizer.add_tokens(["<bot>:"])

model = GPT2LMHeadModel.from_pretrained("gpt2")
model.resize_token_embeddings(len(tokenizer))

model = model.to(device)

# encoded_input = tokenizer("hey i was good at basketball but ", return_tensors='pt', pad_token_id=tokenizer.eos_token_id)
# print(tokenizer.decode(model.generate(**encoded_input)[0]))

chat_data = ChatData("chat_data.json", tokenizer=tokenizer)
chat_data = DataLoader(chat_data, batch_size=64)

model.train()

optim = Adam(model.parameters(), lr=1e-3)


train(chat_data, model, optim)