import torch.nn as nn
from transformers import GPT2LMHeadModel


class EntityModel(nn.Module):
    def __init__(self):
        super(EntityModel, self).__init__()
        self.gpt2 = GPT2LMHeadModel.from_pretrained("gpt2")
        self.gpt2.resize_token_embeddings(50257)

    def forward(self, input_ids, attention_mask, labels):
        outputs = self.gpt2(input_ids, attention_mask, labels)
        return outputs