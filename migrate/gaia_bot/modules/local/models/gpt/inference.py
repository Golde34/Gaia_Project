import torch
from gaia_bot.modules.local.models.gpt.config import device
from gaia_bot.modules.local.models.gpt.tokenizer_config import gpt2_tokenizer
from gaia_bot.modules.local.models.gpt.finetune_gpt2_model import EntityModel
from gaia_bot.kernel.configs.settings import AI_MODEL_LOCATION

def inference(inp):
    tokenizer = gpt2_tokenizer
    model = load_model().to(device)
    inp = "<startofstring> "+ inp +" <bot>: "
    inp = tokenizer(inp, return_tensors="pt")
    X = inp["input_ids"].to(device)
    a = inp["attention_mask"].to(device)
    output = model.gpt2.generate(X, attention_mask=a, max_new_tokens=50)
    output = tokenizer.decode(output[0], skip_special_tokens=True)
    return output

def load_model():
    tokenizer = gpt2_tokenizer

    model = EntityModel()
    model.gpt2.resize_token_embeddings(len(tokenizer))
    model = model.to(device)

    model.load_state_dict(torch.load(AI_MODEL_LOCATION['gpt2']))
    model.eval()

    return model