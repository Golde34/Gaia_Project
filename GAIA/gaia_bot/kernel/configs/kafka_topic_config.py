import os


KAFKA_TOPICS = {
    'CAMERA_CV': [
        'OPEN_CAMERA_SPACE_TOPIC',
        'SHUTDOWN_CAMERA_SPACE_TOPIC'
    ],
}

def load_kakfka_topic(service_name: str):
    topics = []
    for item in KAFKA_TOPICS[service_name]:
        topics.append(os.getenv(item))
    return topics
