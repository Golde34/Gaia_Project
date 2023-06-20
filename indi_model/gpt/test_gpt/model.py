import torch
import torch.nn as nn
from torch.nn import functional as F


class Head(nn.Module):
    def __init__(self, head_size, n_channels, block_size, dropout):
        super().__init__()
        self.key = nn.Linear(n_channels, head_size, bias=False)
        self.query = nn.Linear(n_channels, head_size, bias=False)
        self.value = nn.Linear(n_channels, head_size, bias=False)
        self.register_buffer('tril', torch.tril(torch.ones(block_size, block_size)))
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        B, T, C = x.shape
        k = self.key(x)
        q = self.query(x)
        w = q @ k.transpose(-2, -1) * C**-0.5
        w = w.masked_fill(self.tril[:T, :T] == 0, float('-inf'))
        w = F.softmax(w, dim=-1)
        w = self.dropout(w)
        v = self.value(x)
        out = w @ v
        return out


class MultiHeadAttention(nn.Module):
    def __init__(self, n_heads, head_size, n_channels, block_size, dropout):
        super().__init__()
        self.heads = nn.ModuleList(
            [Head(head_size, n_channels, block_size, dropout)
             for _ in range(n_heads)]
        )
        self.proj = nn.Linear(n_channels, n_channels)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        out = torch.cat([h(x) for h in self.heads], dim=-1)
        out = self.dropout(self.proj(out))
        return out


class FeedForward(nn.Module):
    def __init__(self, n_channels, dropout):
        super().__init__()
        self.ff = nn.Sequential(
            nn.Linear(n_channels, 4* n_channels),
            nn.GELU(),
            nn.Linear(4* n_channels, n_channels),
            nn.Dropout(dropout)
        )

    def forward(self, x):
        return self.ff(x)


class TransformerBlock(nn.Module):
    def __init__(self, n_channels, n_head, block_size, dropout):
        super().__init__()
        head_size = n_channels // n_head
        self.sa = MultiHeadAttention(n_head, head_size, n_channels, block_size, dropout)
        self.ffwd = FeedForward(n_channels)
        self.norm1 = nn.LayerNorm(n_channels)
        self.norm2 = nn.LayerNorm(n_channels)

    def forward(self, x):
        x = x + self.sa(self.norm1(x))
        x = x + self.ffwd(self.norm2(x))
        return x


class GaiaGPT(nn.Module):
    def __init__(self, vocab_size, n_channels, block_size, n_head, n_layer, dropout):
        self.token_embedding = nn.Embedding(vocab_size, n_channels)
        self.position_embedding = nn.Embedding(block_size, n_channels)
        self.blocks = nn.Sequential(*[TransformerBlock(n_channels, n_head, block_size, dropout) for _ in range(n_layer)])
        self.norm = nn.LayerNorm(n_channels)
        self.lm_head = nn.Linear(n_channels, vocab_size)

        self.apply(self._init_weights)

    def _init_weights(self, module):
        if isinstance(module, nn.Linear):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)
            if module.bias is not None:
                torch.nn.init.normal_(module.bias)
        elif isinstance(module, nn.Embedding):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)

    def forward(self, inp_x, targets=None):
        device = inp_x.device
        B, T = inp_x.shape
        tok_emb = self.token_embedding(inp_x)
        pos_emb = self.position_embedding(torch.arange(T, device=device))
        x = tok_emb + pos_emb
        x = self.blocks(x)
        x = self.norm(x)
        logits = self.lm_head(x)

        if targets is None:
            loss = None
        else:
            B, T, C = logits.shape
            logits = logits.view(B * T, C)
            targets = targets.view(B * T)
            loss = F.cross_entropy(logits, targets)

        return logits, loss

    def generate(self, idx, new_tokens_no, block_size):
        for _ in range(new_tokens_no):
            idx_cond = idx[:, -block_size:]
            logits, loss = self(idx_cond)
            logits = logits[:, -1, :]
            probs = F.softmax(logits, dim=-1)
            idx_next = torch.multinomial(probs, num_samples=1)
            idx = torch.cat((idx, idx_next), dim=1)
        return idx