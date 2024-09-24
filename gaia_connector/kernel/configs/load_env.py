from dotenv import load_dotenv
import os


load_dotenv()

def load_kafka_env():
    kafka_consumer_group = os.getenv("KAFKA_CONSUMER_GROUP")
    kafka_bootstrap_servers = os.getenv("KAFKA_BOOTSTRAP_SERVERS")
    return kafka_consumer_group, kafka_bootstrap_servers

def load_bucket_config():
    bucket_name = os.getenv("BUCKET_NAME")
    return bucket_name