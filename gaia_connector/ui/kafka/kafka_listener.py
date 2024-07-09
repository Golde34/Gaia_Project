from core.domain.enums import AcronymsEnum 
from infrastructure.kafka.consumer.kafka_consumer_listener import KafkaConsumerListener
from infrastructure.kafka.consumer.kafka_consumer import registry_consumer, handle_consumer_message

    
@KafkaConsumerListener(AcronymsEnum.CMC.value)
async def handle_open_camera_space(service_name: str, console_manager=None):
    consumer = registry_consumer(service_name)
    await handle_consumer_message(consumer=consumer, consumer_function=handle_camera_cv_message, console_manager=console_manager)
    

def handle_camera_cv_message(msg):
    if msg.topic == 'OPEN_CAMERA_SPACE':
        print(f"Handling OPEN_CAMERA_SPACE message: {msg.value}")
    if msg.topic == 'SHUTDOWN_CAMERA_SPACE':
        print(f"Handling SHUTDOWN_CAMERA_SPACE message: {msg.value}")