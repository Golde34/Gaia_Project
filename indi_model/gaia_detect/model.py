import torch
from torch import nn
from transformers import BertModel, BertTokenizer

class SentenceClassifier(nn.Module):
    def __init__(self, num_labels):
        super(SentenceClassifier, self).__init__()
        self.bert = BertModel.from_pretrained('bert-base-uncased')
        self.classifier = nn.Linear(self.bert.config.hidden_size, num_labels)
    
    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        pooled_output = outputs[1]
        logits = self.classifier(pooled_output)
        return logits

model = SentenceClassifier(num_labels=3)  # Số lớp phân loại mới

for param in model.bert.parameters():
    param.requires_grad = False

optimizer = torch.optim.Adam(model.classifier.parameters(), lr=1e-4)

# # Khi muốn fine-tune lại các lớp BERT
# for param in model.bert.encoder.layer[-1].parameters():
#     param.requires_grad = True

# # Giảm tốc độ học để fine-tune lại các lớp BERT đã mở khóa
# optimizer = torch.optim.Adam(model.parameters(), lr=1e-5)
