import asyncio

from gaia_bot.domain.enums import AcronymsEnum
from gaia_bot.infrastructures.kafka.kafka_consumer import registry_consumer, handle_consumer_message


KAFKA_TOPICS_FUNCTION = {
    AcronymsEnum.CMC.value: handle_open_camera_space,
}

class KafkaConsumerListener:
    
    def __init__(self, service_name: str):
        self.service_name = service_name

    def __call__(self, func):
        def wrapper(*args, **kwargs):
            return func(self.service_name, *args, **kwargs)
        return wrapper


@KafkaConsumerListener(AcronymsEnum.CMC.value)
async def handle_open_camera_space(service_name: str):
    consumer = registry_consumer(service_name)
    await handle_consumer_message(consumer=consumer, consumer_function=handle_camera_cv_message)
    

def handle_camera_cv_message(msg):
    if msg.topic == 'OPEN_CAMERA_SPACE':
        print(f"Handling OPEN_CAMERA_SPACE message: {msg.value}")
    if msg.topic == 'SHUTDOWN_CAMERA_SPACE':
        print(f"Handling SHUTDOWN_CAMERA_SPACE message: {msg.value}")
        
        
if __name__ == "__main__":
    asyncio.run(handle_open_camera_space())
