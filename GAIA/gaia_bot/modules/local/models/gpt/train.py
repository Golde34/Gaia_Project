import argparse
from gaia_bot.modules.local.models.gpt.dataset import ChatData
from torch.optim import Adam
import torch
from torch.utils.data import DataLoader

# from utils.gpu_print import print_gpu_utilization
from gaia_bot.modules.local.models.gpt.config import device, batch_size, learning_rate
from gaia_bot.modules.local.models.gpt.engine import train_engine
from gaia_bot.modules.local.models.gpt.tokenizer_config import gpt2_tokenizer
from gaia_bot.modules.local.models.gpt.finetune_gpt2_model import EntityModel


def train(dataset):
    tokenizer = gpt2_tokenizer

    model = EntityModel()
    model.gpt2.resize_token_embeddings(len(tokenizer))
    model = model.to(device)

    # print(tokenizer.decode(model.generate(**tokenizer("hey i was good at basketball but ",
    #                          return_tensors="pt"))[0]))

    chatData = ChatData(dataset, tokenizer)
    chatData = DataLoader(chatData, batch_size=batch_size)

    model.train()
    # print_gpu_utilization()

    optim = Adam(model.parameters(), lr=learning_rate)
    criterion = torch.nn.CrossEntropyLoss(ignore_index=tokenizer.pad_token_id)

    print("training .... ")
    train_engine(chatData, model, optim)

def pretrained():
    tokenizer = gpt2_tokenizer

    model = EntityModel()
    model.gpt2.resize_token_embeddings(len(tokenizer))
    model = model.to(device)

    model.load_state_dict(torch.load('./model_state.pt'))
    model.eval()

    print(model)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train GPT2 model on multiple datasets")
    parser.add_argument("--train", action="store_true", help="Train the model")
    parser.add_argument("--dataset", required=True, help="Path to the dataset")
    parser.add_argument("--num_epochs", type=int, default=10, help="Number of epochs")
    parser.add_argument("--batch_size", type=int, default=32, help="Batch size")
    parser.add_argument("--learning_rate", type=float, default=1e-4, help="Learning rate")
    parser.add_argument("--max_length", type=int, default=40, help="Maximum length of the input sequence")
    parser.add_argument("--model_path", default="./model_state.pt", help="Path to save the model")

    args = parser.parse_args()

    dataset = args.dataset
    train(dataset)