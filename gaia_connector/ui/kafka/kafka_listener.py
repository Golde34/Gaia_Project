import os

from core.domain.enums import AcronymsEnum, KafkaTopic 
from infrastructure.kafka.consumer.kafka_consumer_listener import KafkaConsumerListener
from infrastructure.kafka.consumer.kafka_consumer import registry_consumer, handle_consumer_message

        
@KafkaConsumerListener(AcronymsEnum.CMC.value)
async def handle_open_camera_space(service_name: str):
    consumer = registry_consumer(service_name)
    await handle_consumer_message(consumer=consumer, consumer_function=handle_camera_cv_message)
    

def handle_camera_cv_message(msg):
    open_camera_space_topic = os.getenv(KafkaTopic.OPEN_CAMERA_SPACE.value)
    shutdown_camera_space_topic = os.getenv(KafkaTopic.SHUTDOWN_CAMERA_SPACE.value)

    if msg.topic == open_camera_space_topic:
        print(f"Handling OPEN_CAMERA_SPACE message: {msg.value}")
    if msg.topic == shutdown_camera_space_topic:
        print(f"Handling SHUTDOWN_CAMERA_SPACE message: {msg.value}")


KAFKA_TOPIC_FUNCTION = {
    AcronymsEnum.CMC.value: handle_open_camera_space
}