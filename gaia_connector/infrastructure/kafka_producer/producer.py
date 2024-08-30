from ui import bus
import time
import json

class KafkaMessage:
    def __init__(self, cmd, error_code: str, error_message: str, display_time: str, data: any):
        self.cmd = cmd
        self.error_code = error_code
        self.error_message = error_message
        self.display_time = display_time
        self.data = data

def publish_message(topic: str, cmd: str, data):
    # key random by real time
    key = str(time.time())
    message = build_message(cmd, '00', 'Success', data)
    message_bytes = json.dumps(message).encode('utf-8')
    producer = bus.get_producer()
    producer.produce(topic, key=key, value=message_bytes, callback=acked)
    producer.poll(1)
    return "Published message to topic: " + topic

def acked(err, msg):
    if err is not None:
        print("Failed to deliver message: %s: %s" % (str(msg), str(err)))
    else:
        print("Message produced: %s" % (str(msg.value())))

def build_message(cmd, error_code, error_message, message):
    display_time = time.time()
    return KafkaMessage(cmd=cmd, error_code=error_code, error_message=error_message, display_time=display_time, data=message)