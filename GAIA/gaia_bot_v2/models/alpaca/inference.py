from unsloth import FastLanguageModel
import torch
from transformers import BitsAndBytesConfig, TextStreamer

max_seq_length = 2048
dtype = None
load_in_4bit = True

alpaca_prompt = """Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

    ### Instruction:
    {}

    ### Input:
    {}

    ### Response:
    {}"""

def inference():
 
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name = "lora_model",
        max_seq_length = max_seq_length,
        dtype = dtype,
        load_in_4bit = load_in_4bit,
    )
    FastLanguageModel.for_inference(model)

    inputs = tokenizer(
    [
        alpaca_prompt.format(
            "I want to create a task about to ", # instruction
            "learn the new thing!", # input
            "", # output - leave this blank for generation!
        )
    ], return_tensors = "pt").to("cuda")
    
    text_streamer = TextStreamer(tokenizer)
    outputs = model.generate(**inputs, streamer = text_streamer, max_new_tokens = 128)
    
    return outputs