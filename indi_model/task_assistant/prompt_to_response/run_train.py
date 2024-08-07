from torch.utils.data import DataLoader
import nltk
from transformers import BertTokenizer
import config
import model_config
from data_loader import return_data, TextDataset, DataPreprocessor
from trainer import SimpleNNTrainer, BERTTrainer

if __name__ == "__main__":
    data = return_data(config=config)

    preprocessor = DataPreprocessor(data)
    preprocessor.preprocess()
    x_train, y_train = preprocessor.get_train_data()
    tags, prompt_all_words, response_all_words = preprocessor.get_tags_and_words()

    # simple_trainer = SimpleNNTrainer(
    #     input_size=len(x_train[0]),
    #     hidden_size=8,
    #     num_classes=len(tags),
    #     learning_rate=0.001,
    #     num_epochs=1000,
    #     batch_size=4
    # )
    # simple_trainer.train(x_train, y_train)
    # simple_trainer.save_model("TrainData.pth", len(x_train[0]), 8, len(tags), prompt_all_words, tags)

    tokenizer = BertTokenizer.from_pretrained(model_config.BASE_MODEL_PATH)
    tag_to_idx = {tag: idx for idx, tag in enumerate(tags)}
    labels = [tag_to_idx[tag] for tag in data['tag']]
    max_len = 64
    dataset = TextDataset(data['prompt'], data['response'], labels, tokenizer, max_len)
    train_loader = DataLoader(dataset, batch_size=4, shuffle=True)

    bert_trainer = BERTTrainer(
        num_classes=len(tag_to_idx),
        learning_rate=1e-4,
        num_epochs=1000,
        batch_size=16
    )
    bert_trainer.train(train_loader)
    bert_trainer.save_model("TrainDataBert.pth", len(x_train[0]), 8, len(tags), prompt_all_words, tags)
