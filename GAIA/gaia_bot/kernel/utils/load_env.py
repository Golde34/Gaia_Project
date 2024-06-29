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
    model_path=os.getenv("MODEL_PATH")
    return bert_model_path, training_dataset, meta_model_path, model_path