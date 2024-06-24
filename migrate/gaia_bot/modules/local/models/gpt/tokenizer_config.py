from transformers import GPT2Tokenizer


gpt2_tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
gpt2_tokenizer.add_special_tokens({"pad_token": "<pad>", 
                                "bos_token": "<startofstring>",
                                "eos_token": "<endofstring>"})
gpt2_tokenizer.add_tokens(["<bot>:"])