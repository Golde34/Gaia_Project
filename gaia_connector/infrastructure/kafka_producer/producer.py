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
    
    def to_dict(self):
        # Converts the KafkaMessage object to a dictionary for JSON serialization
        return {
            "cmd": self.cmd,
            "error_code": self.error_code,
            "error_message": self.error_message,
            "display_time": self.display_time,
            "data": self.data
        }
    
    def __str__(self):
        return f"cmd: {self.cmd}, error_code: {self.error_code}, error_message: {self.error_message}, display_time: {self.display_time}, data: {self.data}"


def publish_message(topic: str, cmd: str, data):
    try:
        # key random by real time
        key = str(time.time())
        message = build_message(cmd, '00', 'Success', data)
        message_bytes = json.dumps(message).encode('utf-8')
        producer = bus.get_producer()
        producer.produce(topic, key=key, value=message_bytes, callback=acked)
        producer.poll(1)
    except Exception as e:
        print(f"Exception when publishing message to topic: {e}")
    return "Published message to topic: " + topic

def build_message(cmd, error_code, error_message, message):
    display_time = time.time()
    kafka_message = KafkaMessage(cmd=cmd, error_code=error_code, error_message=error_message, display_time=display_time, data=message)
    print("Kafka message: ", kafka_message.__str__())
    
    # Return the dictionary representation of KafkaMessage instead of the object
    return kafka_message.to_dict()

def acked(err, msg):
    if err is not None:
        print("Failed to deliver message: %s: %s" % (str(msg), str(err)))
    else:
        print("Message produced: %s" % (str(msg.value())))
