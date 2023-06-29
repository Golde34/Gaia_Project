import torch.cuda

batch_size = 32
block_size = 256
max_iters = 5000
eval_interval = 500
learning_rate = 3e-4
device = 'cuda' if torch.cuda.is_available() else 'cpu'
eval_iters = 200
n_embedded = 384
n_head = 6
n_layer = 6
dropout = 0.2
seed = 1337
max_length = 1024
dataset_path = "../input/nomic-ai/turbo-500k-multi"
num_proc = 32