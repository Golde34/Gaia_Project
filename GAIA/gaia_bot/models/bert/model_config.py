import transformers
from gaia_bot.kernel.configs.load_env import load_bert_env

bert_model_path, training_dataset, meta_model_path, model_path = load_bert_env()

MAX_LEN = 128
TRAIN_BATCH_SIZE = 32
VALID_BATCH_SIZE = 8
EPOCHS = 10
BASE_MODEL_PATH = bert_model_path
MODEL_PATH = model_path
TRAINING_FILE = training_dataset
META_MODEL = meta_model_path
TOKENIZER = transformers.BertTokenizer.from_pretrained(
    BASE_MODEL_PATH,
    do_lower_case=True
)