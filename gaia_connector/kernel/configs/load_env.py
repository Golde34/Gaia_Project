from dotenv import load_dotenv
import os

from kernel.configs.kafka_config import KAFKA_TOPICS  


load_dotenv()

def load_kafka_env():
    kafka_consumer_group = os.getenv("KAFKA_CONSUMER_GROUP")
    kafka_bootstrap_servers = os.getenv("KAFKA_BOOTSTRAP_SERVERS")
    return kafka_consumer_group, kafka_bootstrap_servers

def load_kakfka_topic(service_name: str):
    topics = []
    for item in KAFKA_TOPICS[service_name]['kafka_topics']:
        topics.append(os.getenv(item))
    return topics