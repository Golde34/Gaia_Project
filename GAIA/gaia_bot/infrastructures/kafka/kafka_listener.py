import asyncio

from gaia_bot.domain.enums import KafkaServiceName
from gaia_bot.infrastructures.kafka.kafka_consumer import registry_consumer, handle_consumer_message
from gaia_bot.kernel.configs.kafka_topic_config import load_kakfka_topic


class KafkaConsumerListener:
    
    def __init__(self, service_name: str):
        self.service_name = service_name

    def __call__(self, func):
        def wrapper(*args, **kwargs):
            return func(*args, **kwargs)
        return wrapper


@KafkaConsumerListener(KafkaServiceName.CAMERA_CV.value)
def handle_open_camera_space(service_name: str):
    consumer = registry_consumer(service_name)
    handle_consumer_message(consumer=consumer, consumer_function=handle_camera_cv_message)
    

def handle_camera_cv_message(msg):
    if msg.topic == 'OPEN_CAMERA_SPACE':
        print(f"Handling OPEN_CAMERA_SPACE message: {msg.value}")
    if msg.topic == 'SHUTDOWN_CAMERA_SPACE':
        print(f"Handling SHUTDOWN_CAMERA_SPACE message: {msg.value}")
        
        
if __name__ == "__main__":
    asyncio.run(handle_open_camera_space())
