from datasets import load_dataset
import torch.nn as nn
from transformers import BertModel, BertTokenizer
import model_config
import torch.nn as nn


class SimpleNetwork(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(SimpleNetwork, self).__init__()
        self.l1 = nn.Linear(input_size, hidden_size)
        self.l2 = nn.Linear(hidden_size, hidden_size)
        self.l3 = nn.Linear(hidden_size, num_classes)
        self.relu = nn.ReLU()

    def forward(self, x):
        out = self.l1(x)
        out = self.relu(out)
        out = self.l2(out)
        out = self.relu(out)
        out = self.l3(out)
        return out

class BertClassifier(nn.Module):
    def __init__(self, num_classes):
        super(BertClassifier, self).__init__()
        self.bert = BertModel.from_pretrained(model_config.BASE_MODEL_PATH)  # You can use other BERT variants if needed
        self.drop = nn.Dropout(p=0.3)
        self.fc = nn.Linear(self.bert.config.hidden_size, num_classes)
        
    def forward(self, input_ids, attention_mask, token_type_ids):
        outputs = self.bert(input_ids=input_ids, 
                            attention_mask=attention_mask, 
                            token_type_ids=token_type_ids)
        # Take the output of the [CLS] token (first token)
        cls_output = outputs[1]
        dropped_output = self.drop(cls_output)
        logits = self.fc(dropped_output)
        return logits

