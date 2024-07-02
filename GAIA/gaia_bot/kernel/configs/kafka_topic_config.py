import os


KAFKA_TOPICS = [
    'OPEN_CAMERA_SPACE_TOPIC',
    'SHUTDOWN_CAMERA_SPACE_TOPIC'
]

def load_kakfka_topic():
    topics = []
    for item in KAFKA_TOPICS:
        topics.append(os.getenv(item))
    return topics
