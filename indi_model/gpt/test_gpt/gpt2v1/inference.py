from config import device
from tokenizer_config import gpt2_tokenizer
import torch
from finetune_gpt2_model import EntityModel


def infer(inp):
    tokenizer = gpt2_tokenizer
    model = load_model().to(device)
    inp = "<startofstring> "+ inp +" <bot>: "
    inp = tokenizer(inp, return_tensors="pt")
    X = inp["input_ids"].to(device)
    a = inp["attention_mask"].to(device)
    output = model.gpt2.generate(X, attention_mask=a)
    output = tokenizer.decode(output[0])
    return output

def load_model():
    tokenizer = gpt2_tokenizer

    model = EntityModel()
    model.gpt2.resize_token_embeddings(len(tokenizer))
    model = model.to(device)

    model.load_state_dict(torch.load('./model.pt'))
    model.eval()

    print(model)
    return model