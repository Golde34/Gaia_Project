from ui import bus

def publish_message(topic: str, message: dict):
    key = message['key']
    value = message['value']
    producer = bus.get_producer()
    producer.produce(topic, key=key, value=value, callback=acked)
    producer.poll(1)
    return "Published message to topic: " + topic

def acked(err, msg):
    if err is not None:
        print("Failed to deliver message: %s: %s" % (str(msg), str(err)))
    else:
        print("Message produced: %s" % (str(msg.value())))