from dotenv import load_dotenv
import os

load_dotenv()

def load_env_for_auth():
    username = os.getenv("USERNAME")
    password = os.getenv("PASSWORD")
    name = os.getenv("NAME")
    email = os.getenv("EMAIL")
    email_password = os.getenv("EMAIL_PWD")
    return username, password, name, email, email_password

def load_bert_env():
    bert_model_path=os.getenv("BERT_MODEL_PATH")
    training_dataset=os.getenv("TRAINING_DATASET")
    meta_model_path=os.getenv("META_MODEL_PATH")
    train_batch_size=os.getenv("TRAIN_BATCH_SIZE")
    valid_batch_size=os.getenv("VALID_BATCH_SIZE")
    epochs=os.getenv("EPOCHS")
    learning_rate=os.getenv("LEARNING_RATE")
    max_len=os.getenv("MAX_LEN")
    return bert_model_path, training_dataset, meta_model_path, train_batch_size, valid_batch_size, epochs, learning_rate, max_len