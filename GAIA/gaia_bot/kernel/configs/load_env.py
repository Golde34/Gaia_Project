from dotenv import load_dotenv
import os

from gaia_bot.domain.enums import AcronymsEnum


KAFKA_TOPICS = {
    AcronymsEnum.CMC.value: {
        'kafka_topics': [
            'OPEN_CAMERA_SPACE_TOPIC',
            'SHUTDOWN_CAMERA_SPACE_TOPIC'
        ],
    },
}

load_dotenv()

def load_env_for_auth():
    username = os.getenv("USERNAME")
    password = os.getenv("PASSWORD")
    name = os.getenv("NAME")
    email = os.getenv("EMAIL")
    email_password = os.getenv("EMAIL_PWD")
    return username, password, name, email, email_password

def load_bert_env():
    bert_model_path = os.getenv("BERT_MODEL_PATH")
    training_dataset = os.getenv("TRAINING_DATASET")
    meta_model_path = os.getenv("META_MODEL_PATH")
    model_path = os.getenv("MODEL_PATH")
    return bert_model_path, training_dataset, meta_model_path, model_path

def load_alpaca_env():
    google_colab_link = os.getenv("GOOGLE_COLAB_LINK")
    return google_colab_link

def load_kafka_env():
    kafka_consumer_group = os.getenv("KAFKA_CONSUMER_GROUP")
    kafka_bootstrap_servers = os.getenv("KAFKA_BOOTSTRAP_SERVERS")
    return kafka_consumer_group, kafka_bootstrap_servers

def load_kakfka_topic(service_name: str):
    topics = []
    for item in KAFKA_TOPICS[service_name]['kafka_topics']:
        topics.append(os.getenv(item))
    return topics