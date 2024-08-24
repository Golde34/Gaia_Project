from ui import bus
import time
import json


def publish_message(topic: str, message):
    # key random by real time
    key = str(time.time())
    message_bytes = json .dumps(message).encode('utf-8')
    producer = bus.get_producer()
    producer.produce(topic, key=key, value=message_bytes, callback=acked)
    producer.poll(1)
    return "Published message to topic: " + topic

def acked(err, msg):
    if err is not None:
        print("Failed to deliver message: %s: %s" % (str(msg), str(err)))
    else:
        print("Message produced: %s" % (str(msg.value())))