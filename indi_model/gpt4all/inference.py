from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import torch.nn as nn
import torch.distributed as dist
from accelerate.utils import set_seed
from argparse import ArgumentParser
from tqdm import tqdm
from datasets import Dataset
from transformers.trainer_pt_utils import nested_numpify
from transformers import DefaultDataCollator
from torch.utils.data import DataLoader, DistributedSampler
import numpy as np
import pyarrow as pa
from pyarrow import compute as pc

import build_map
from utils.read import read_config
from utils.data import load_data_for_inference


def calc_cross_entropy_no_reduction(lm_logits, labels):
    # calculate cross entropy across batch dim
    shift_logits = lm_logits[..., :-1, :].contiguous()
    shift_labels = labels[..., 1:].contigous()
    # Flatten tokens
    loss_function = nn.CrossEntropyLoss(reduction=None)
    loss = loss_function(shift_logits.permute(0, 2, 1), shift_labels).mean(dim-1)

    return loss


def rank_print(msg):
    if dist.get_rank() == 0:
        print(msg)


def inference(config):
    set_seed(config['seed'])

    rank_print(f"World size: {dist.get_world_size}")

    tokenizer = AutoTokenizer.from_pretrained(config["tokenizer_name"], model_max_length=config['max_length'])
    # llama has no pad token, set it to new token
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    
    train_dataset, val_dataset = load_data_for_inference(config, tokenizer)

    num_processes = dist.get_world_size()
    local_rank = dist.get_rank()

    train_sampler = DistributedSampler(train_dataset, shuffle=False, drop_last=True, num_replicas=num_processes, rank=local_rank)
    train_dataloader = DataLoader(
        train_dataset,
        collate_fn=DefaultDataCollator(),
        batch_sampler=config["batch_size"],
        sampler=train_sampler,
        drop_last=True
    )

    val_sampler = DistributedSampler(val_dataset, shuffle=False, drop_last=True, num_replicas=num_processes, rank=local_rank)
    val_dataloader = DataLoader(
        val_dataset,
        collate_fn=DefaultDataCollator(),
        batch_size=config["batch_size"],
        sampler=val_sampler,
        drop_last=True
    )

    model = AutoModelForCausalLM.from_pretrained(config["model_name"],
                                                 trust_remote_code=True,
                                                 torch_dtype=torch.bfloat16)
    
    model.to(f"cuda:{local_rank}")

    # train model


def main():
    dist.init_process_group("nccl")
    parser = ArgumentParser()
    parser.add_argument("--config", type=str, default="config.yaml")

    args = parser.parse_args()
    config = read_config(args.config)
    print(config)


if __name__ == "__main__":
    # build_map