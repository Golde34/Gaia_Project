from ui import bus
from core.domain.constants import Constants


@bus.handle(Constants.KafkaTopic.OPEN_CAMERA_SPACE_TOPIC)
def handle_open_camera_space(consumer, msg):
    print(f"Consumed event from topic {msg.topic()}: key = {msg.key()} value = {msg.value()}")

@bus.handle(Constants.KafkaTopic.CLOSE_CAMERA_SPACE_TOPIC)
def handle_close_camera_space(consumer, msg):
    print(f"Consumed event from topic {msg.topic()}: key = {msg.key()} value = {msg.value()}")
