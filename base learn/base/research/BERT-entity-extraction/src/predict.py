import joblib
import torch

import config
import dataset
from bert_model import EntityModel


if __name__ == "__main__":

    meta_data = joblib.load("meta.bin")
    enc_pos = meta_data["enc_pos"]
    enc_tag = meta_data["enc_tag"]

    num_pos = len(list(enc_pos.classes_))
    num_tag = len(list(enc_tag.classes_))

    sentence = """
        golde is going to london
    """

    tokenized_sentence = config.TOKENIZER.encode(sentence)

    res_sentence = "<CLS> " + sentence + " <SEP>"

    sentence = sentence.split()
    res_sentence = res_sentence.split()

    print(res_sentence)
    print(sentence)
    print(tokenized_sentence)

    test_dataset = dataset.EntityDataset(
        texts=[sentence],
        pos=[[0] * len(sentence)],
        tags=[[0] * len(sentence)]
    )

    device = torch.device("cuda")
    model = EntityModel(num_tag=num_tag, num_pos=num_pos)
    model.load_state_dict(torch.load(config.MODEL_PATH))
    model.to(device)

    with torch.no_grad():
        data = test_dataset[0]
        for k, v in data.items():
            data[k] = v.to(device).unsqueeze(0)
        tag, pos, _ = model(**data)

        res_tag = enc_tag.inverse_transform(
                tag.argmax(2).cpu().numpy().reshape(-1)
            )[:len(tokenized_sentence)]
        res_pos = enc_pos.inverse_transform(
                pos.argmax(2).cpu().numpy().reshape(-1)
            )[:len(tokenized_sentence)]

        print(
            enc_tag.inverse_transform(
                tag.argmax(2).cpu().numpy().reshape(-1)
            )[:len(tokenized_sentence)]
        )

    for s in range(0,len(tokenized_sentence)):
        if res_tag[s] != 'O':
            print(res_tag[s], res_pos[s], tokenized_sentence[s], config.TOKENIZER.decode(tokenized_sentence[s]))
            print('------------------------')
