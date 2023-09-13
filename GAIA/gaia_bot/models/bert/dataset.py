from gaia_bot.models.bert import model_config
import torch


class EntityDataset:
    def __init__(self, texts, pos, tags):
        self.texts = texts
        self.pos = pos
        self.tags = tags

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, item):
        text = self.texts[item]
        pos = self.pos[item]
        tags = self.tags[item]

        ids = []
        target_pos = []
        target_tag = []

        for i, s in enumerate(text):
            inputs = model_config.TOKENIZER.encode(
                s,
                add_special_tokens=False
            )
            input_length = len(inputs)
            ids.extend(inputs)
            target_pos.extend([pos[i]] * input_length)
            target_tag.extend([tags[i]] * input_length)

        ids = ids[:model_config.MAX_LEN - 2]
        target_pos = target_pos[:model_config.MAX_LEN - 2]
        target_tag = target_tag[:model_config.MAX_LEN - 2]

        ids = [101] + ids + [102]
        target_pos = [0] + target_pos + [0]
        target_tag = [0] + target_tag + [0]

        mask = [1] * len(ids)
        token_type_ids = [0] * len(ids)

        padding_length = model_config.MAX_LEN - len(ids)

        ids = ids + ([0] * padding_length)
        mask = mask + ([0] * padding_length)
        token_type_ids = token_type_ids + ([0] * padding_length)
        target_pos = target_pos + ([0] * padding_length)
        target_tag = target_tag + ([0] * padding_length)

        return {
            "ids": torch.tensor(ids, dtype=torch.long),
            "mask": torch.tensor(mask, dtype=torch.long),
            "token_type_ids": torch.tensor(token_type_ids, dtype=torch.long),
            "target_pos": torch.tensor(target_pos, dtype=torch.long),
            "target_tag": torch.tensor(target_tag, dtype=torch.long),
       }