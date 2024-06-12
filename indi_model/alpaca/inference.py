from unsloth import FastLanguageModel
import torch
from transformers import BitsAndBytesConfig
max_seq_length = 2048 # Choose any! We auto support RoPE Scaling internally!
dtype = None # None for auto detection. Float16 for Tesla T4, V100, Bfloat16 for Ampere+
load_in_4bit = True # Use 4bit quantization to reduce memory usage. Can be False.

# model, tokenizer = FastLanguageModel.from_pretrained(
#     model_name = "unsloth/llama-2-7b-bnb-4bit", # Choose ANY! eg mistralai/Mistral-7B-Instruct-v0.2
#     max_seq_length = max_seq_length,
#     dtype = dtype,
#     load_in_4bit = load_in_4bit,
#     # token = "hf_...", # use one if using gated models like meta-llama/Llama-2-7b-hf
# )


# device_map = {
#     "transformer.word_embeddings": 0,
#     "transformer.word_embeddings_layernorm": 0,
#     "lm_head": "cpu",
#     "transformer.h": 0,
#     "transformer.ln_f": 0,
# }

# quantization_config = BitsAndBytesConfig(llm_int8_enable_fp32_cpu_offload=True)

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = "lora_model", # YOUR MODEL YOU USED FOR TRAINING
    max_seq_length = max_seq_length,
    dtype = dtype,
    load_in_4bit = load_in_4bit,
    # quantization_config = quantization_config,
)
FastLanguageModel.for_inference(model) # Enable native 2x faster inference


alpaca_prompt = """You are Gaia. Your boss is Golde. Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:
{}

### Input:
{}

### Response:
{}"""

EOS_TOKEN = tokenizer.eos_token
def formatting_prompts_func(examples):
    instructions = examples["instruction"]
    inputs       = examples["input"]
    outputs      = examples["output"]
    texts = []
    for instruction, input, output in zip(instructions, inputs, outputs):
        # Must add EOS_TOKEN, otherwise your generation will go on forever!
        text = alpaca_prompt.format(instruction, input, output) + EOS_TOKEN
        texts.append(text)
    return { "text" : texts, }
pass

# alpaca_prompt = Copied from above
FastLanguageModel.for_inference(model) # Enable native 2x faster inference
inputs = tokenizer(
[
    alpaca_prompt.format(
        "Answer my question", # instruction
        "What is your name?", # input
        "", # output - leave this blank for generation!
    )
], return_tensors = "pt").to("cuda")

from transformers import TextStreamer
text_streamer = TextStreamer(tokenizer)
outputs = model.generate(**inputs, streamer = text_streamer, max_new_tokens = 128)
# outputs = model.generate(**inputs, max_new_tokens = 64, use_cache = True)
# tokenizer.batch_decode(outputs)

# print("Done!")
# print(outputs)
