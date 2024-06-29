import transformers
from gaia_bot.kernel.utils.load_env import load_bert_env

bert_model_path, training_dataset, meta_model_path, train_batch_size, valid_batch_size, epochs, learning_rate, max_len = load_bert_env()

MAX_LEN = max_len
TRAIN_BATCH_SIZE = train_batch_size
VALID_BATCH_SIZE = valid_batch_size
EPOCHS = epochs
BASE_MODEL_PATH = bert_model_path
MODEL_PATH = bert_model_path
TRAINING_FILE = training_dataset
META_MODEL = meta_model_path
TOKENIZER = transformers.BertTokenizer.from_pretrained(
    BASE_MODEL_PATH,
    do_lower_case=True
)