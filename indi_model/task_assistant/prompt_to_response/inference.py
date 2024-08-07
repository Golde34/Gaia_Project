import random
import torch
from model import SimpleNetwork, BertClassifier
from transformers import BertTokenizer
from utils.model_utils import bag_words, tokenize
from model_config import BASE_MODEL_PATH

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

data_simple = torch.load("TrainData.pth")
data_bert = torch.load("TrainDataBert.pth")

# -------------
Name = "Gaia"

def Main():
    sentence = input("You: ")

    if sentence.lower() in ["bye jarvis", "exit"]:
        print("Exiting...")
        exit()

    # selected_model = "BertClassifier"
    selected_model = "SimpleNetwork"
    print(f"Selected model: {selected_model}")

    if selected_model == "SimpleNetwork":
        input_size = data_simple["input_size"]
        hidden_size = data_simple["hidden_size"]
        num_classes = data_simple["num_classes"]
        all_words = data_simple["prompt_all_words"]
        tags = data_simple["tags"]
        model_state = data_simple["model_state"]

        model = SimpleNetwork(input_size, hidden_size, num_classes).to(device)
        model.load_state_dict(model_state)
        model.eval()

        tokenized_sentence = tokenize(sentence)
        X = bag_words(tokenized_sentence, all_words)
        X = torch.from_numpy(X.reshape(1, X.shape[0])).to(device)
        output = model(X)

    elif selected_model == "BertClassifier":
        num_classes = data_bert["num_classes"]
        tags = data_bert["tags"]
        model_state = data_bert["model_state"]

        model = BertClassifier(num_classes=num_classes).to(device)
        model.load_state_dict(model_state)
        model.eval()

        tokenizer = BertTokenizer.from_pretrained(BASE_MODEL_PATH)
        encoding = tokenizer.encode_plus(
            sentence,
            add_special_tokens=True,
            max_length=128,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_token_type_ids=True,
            return_tensors='pt'
        )
        input_ids = encoding['input_ids'].to(device)
        attention_mask = encoding['attention_mask'].to(device)
        token_type_ids = encoding['token_type_ids'].to(device)
        output = model(input_ids, attention_mask, token_type_ids)

    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]
    prob = torch.softmax(output, dim=1)[0][predicted.item()]

    if prob.item() > 0.5:
        print(f"{Name}: {tag}")
    else:
        print("I'm not sure how to respond to that.")   

while True:
    Main()