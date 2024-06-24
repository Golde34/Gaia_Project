import torch
from unsloth import FastLanguageModel

import gaia_bot.kernel.configs.settings as settings
import gaia_bot.kernel.configs.auth_config as auth_config

max_seq_length = 2048  # Choose any! We auto support RoPE Scaling internally!
dtype = None  # None for auto detection. Float16 for Tesla T4, V100, Bfloat16 for Ampere+
load_in_4bit = True  # Use 4bit quantization to reduce memory usage. Can be False.

alpaca_prompt = """Answer or reply your boss question or talk with him as Gaia the virtual assistant. 
    Your boss named """ + auth_config.username + """. 
    Below is an instruction that describes a task, paired with an input that provides further context. 
    Write a response that appropriately completes the request.

### Instruction:
{}

### Input:
{}

### Response:
{}
"""

def get_model_and_tokenizer():
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name = settings.AI_MODEL_LOCATION['alpaca'],
        max_seq_length=max_seq_length,
        dtype=dtype,
        load_in_4bit=load_in_4bit,
    )
    FastLanguageModel.for_inference(model)
    return model, tokenizer

def call_alpaca_response(inp, model, tokenizer): 
    inputs = tokenizer(
        [
            alpaca_prompt.format(
                "Answer my question",  # instruction
                inp,  # input
                "",  # output - leave this blank for generation!
            )
        ],
        return_tensors="pt",
    ).to("cuda")
    
    outputs = model.generate(**inputs, max_new_tokens=128)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response       


def model_inference(inp):

    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name="golde_llama",  # YOUR MODEL YOU USED FOR TRAINING
        max_seq_length=max_seq_length,
        dtype=dtype,
        load_in_4bit=load_in_4bit,
        # quantization_config = quantization_config,
    )
    FastLanguageModel.for_inference(model)  # Enable native 2x faster inference

    # alpaca_prompt = Copied from above
    inputs = tokenizer(
        [
            alpaca_prompt.format(
                "Answer my question",  # instruction
                inp,  # input
                "",  # output - leave this blank for generation!
            )
        ],
        return_tensors="pt",
    ).to("cuda")

    outputs = model.generate(**inputs, max_new_tokens=128)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    torch.cuda.empty_cache()
    
    return response


def gaia_wakeup_generate(model, tokenizer):
    inputs = tokenizer(
        [
            alpaca_prompt.format(
                "Generate a greeting to your boss. For example: ",  # instruction
                "Hello boss, I'm available now!",  # input
                "",  # output - leave this blank for generation!
            )
        ],
        return_tensors="pt",
    ).to("cuda")
    
    outputs = model.generate(**inputs, max_new_tokens=64)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    print(response)
    return response


if __name__ == "__main__":
    # print(model_inference("What is your name?"))
    print(gaia_wakeup_generate())
