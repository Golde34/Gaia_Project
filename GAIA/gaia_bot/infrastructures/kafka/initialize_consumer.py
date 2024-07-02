import aiokafka
import asyncio
import warnings

# from gaia_bot.kernel.configs.load_env import load_kafka_env
# from gaia_bot.kernel.configs.kafka_topic_config import load_kakfka_topic, KAFKA_TOPICS
# from gaia_bot.domain.enums import KafkaServiceName

warnings.filterwarnings("ignore", category=UserWarning, module="sklearn.base")

consumer_task = None
consumer = None

# kafka_consumer_group, kafka_bootstrap_servers = load_kafka_env()
# kafka_topics = load_kakfka_topic(KafkaServiceName.CAMERA_CV.value) 

kafka_consumer_group = 'gaia_bot'
kafka_bootstrap_servers = 'localhost:9094'
kafka_topics = ['OPEN_CAMERA_SPACE', 'SHUTDOWN_CAMERA_SPACE']

async def consume(
        kafka_topics=kafka_topics, 
        kafka_consumer_group=kafka_consumer_group, 
        kafka_bootstrap_servers=kafka_bootstrap_servers
    ):
    consumer = aiokafka.AIOKafkaConsumer(
        *kafka_topics,
        bootstrap_servers=kafka_bootstrap_servers,
        group_id=kafka_consumer_group)
    # Get cluster layout and join group `my-group`
    await consumer.start()
    try:
        # Consume messages
        async for msg in consumer:
            print("consumed: ", msg.topic, msg.partition, msg.offset,
                  msg.key, msg.value, msg.timestamp)
    finally:
        # Will leave consumer group; perform autocommit if enabled.
        await consumer.stop()


if __name__ == '__main__':
    asyncio.run(consume())