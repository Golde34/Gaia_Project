import torch
import torch.nn as nn
from torch.nn import functional as F
# from transformers import AutoTokenizer
# from accelerate.utils import set_seed

import dataset
import hyperparameters
import tokenization

torch.manual_seed(1337)