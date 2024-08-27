from ui import bus


@bus.handle('gaia.open-camera-space.topic')
def handle_open_camera_space(consumer, msg):
    print(f"Consumed event from topic {msg.topic()}: key = {msg.key()} value = {msg.value()}")
