import aiokafka
import warnings

from kernel.configs.load_env import load_kafka_env, load_kakfka_topic


warnings.filterwarnings("ignore", category=UserWarning, module="sklearn.base")

consumer_task = None
consumer = None

def registry_consumer(service_name):
    kafka_consumer_group, kafka_bootstrap_servers = load_kafka_env()
    topics = load_kakfka_topic(service_name)
    consumer = aiokafka.AIOKafkaConsumer(
        *topics,
        bootstrap_servers=kafka_bootstrap_servers,
        group_id=kafka_consumer_group)
    return consumer

async def handle_consumer_message(consumer, consumer_function=None):
    await consumer.start()
    try:
        async for msg in consumer:
            # print("consumed: ", msg.topic, msg.partition, msg.offset,
            #       msg.key, msg.value, msg.timestamp)
            if consumer_function is not None:
                consumer_function(msg)
    finally:
        await consumer.stop()
