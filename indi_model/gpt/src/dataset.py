import os.path

import torch
import glob
import pandas as pd
import numpy as np
import fastparquet
from datasets import load_dataset, concatenate_datasets
from torch.utils.data import DataLoader
from transformers import DefaultDataCollator, AutoTokenizer

import model_config
import hyperparameters

random_seed = 1337
np.random.seed(random_seed)

# Load data
data_df = pd.read_parquet(model_config.DATA_FILE_1, engine="fastparquet")

data_df = data_df[data_df.columns.drop("source")]

print(data_df.columns)


def tokenize_inputs(config, tokenizer, df):
    max_length = config.max_length

    different_eos = tokenizer.eos_token != "</s>"
    out = {"labels": [], "input_ids": [], "prompt": "", "response": ""}
    for prompt, response in zip(df['prompt'], df['response']):
        if different_eos:
            if response.count("</s> \n") > 0:
                response = response.replace("</s> \n", f"{tokenizer.eos_token} \n")

        prompt_len = len(tokenizer(prompt + "\n", return_tensors="pt")["input_ids"][0])

        if prompt_len >= max_length // 2:
            # if prompt is too long, truncate
            # but make sure to truncate to at max 1024 tokens
            new_len = min(max_length // 2, len(prompt) // 2)
            prompt = prompt[:new_len]
            # get new prompt length
            prompt_len = tokenizer(prompt + "\n", return_tensors="pt", max_length=max_length // 2,
                                   truncation=True).input_ids.ne(tokenizer.pad_token_id).sum().item()

        assert prompt_len <= max_length // 2, f"prompt length {prompt_len} exceeds max length {max_length}"

        input_tokens = tokenizer(prompt + "\n" + response + tokenizer.eos_token,
                                 truncation=True, max_length=max_length, return_tensors="pt")["input_ids"].squeeze()

        labels = input_tokens.clone()
        labels[:prompt_len] = -100
        if len(labels) < max_length:
            # pad to max_length with -100
            labels = torch.cat([labels, torch.full((max_length - len(labels),), -100)])

        assert (labels == -100).sum() < len(
            labels), f"Labels are all -100, something wrong. prompt length {prompt_len} exceeds max length {max_length}"

        if (labels == -100).sum() == len(labels) - 1:
            print(prompt)
            print(response)
            raise

        input_tokens = tokenizer.pad({"input_ids": input_tokens}, padding="max_length", max_length=max_length)[
            "input_ids"]
        out["labels"].append(labels)
        out["input_ids"].append(input_tokens)
        out['prompt'] = prompt
        out['response'] = response
        print(out)

    out = {k: torch.stack(v) if isinstance(v, list) else v for k, v in out.items()}

    return out

def load_data(config, tokenizer):
    dataset_path = config.dataset_path
    files = None
    if os.path.exists(dataset_path):
        if os.path.isdir(dataset_path):
            files = glob.glob(os.path.join(dataset_path, "_*clean.parquet"))
        else:
            files = [dataset_path]

        print(f"Reading files {files}")

    dataset = load_dataset("parquet", data_files=files, split="train")

    dataset = dataset.train_test_split(test_size=.05, seed=config.seed)

    train_dataset, val_dataset = dataset["train"], dataset["test"]
    print(train_dataset)
    print(val_dataset)

    if config.streaming is False:
        kwargs = {"num_proc": config.num_proc}
    else:
        kwargs = {}

    # tokenizer inputs and return labels and attention mask
    train_dataset = train_dataset.map(
        lambda ele: tokenize_inputs(config, tokenizer, ele),
        batched=True,
        remove_columns=["source", "prompt"],
        **kwargs
    )
    print(train_dataset)

    train_dataset = train_dataset.with_format("torch")
    val_dataset = val_dataset.with_format("torch")

    # create dataloader with default data collator since we already have labels
    train_dataloader = DataLoader(
        train_dataset,
        collate_fn=DefaultDataCollator(),
        batch_size=config.batch_size,
    )
    val_dataloader = DataLoader(
        val_dataset,
        collate_fn=DefaultDataCollator(),
        batch_size=config.batch_size,
    )

    return train_dataloader, val_dataloader

from transformers import GPTNeoForCausalLM, GPT2Tokenizer

if __name__ == "__main__":
    tokenizer = AutoTokenizer.from_pretrained("EleutherAI/gpt-j-6B", model_max_length=hyperparameters.max_length)
    tokenizer.pad_token = tokenizer.eos_token
    out = tokenize_inputs(hyperparameters, tokenizer, data_df.head())
    print(out)
    # train, val = load_data(hyperparameters, tokenizer)
    # print(train)
    # print(val)