from dotenv import load_dotenv
import os


load_dotenv()

class Constants:
    class KafkaTopic:
        OPEN_CAMERA_SPACE = os.getenv("KAFKA_TOPICS.OPEN_CAMERA_SPACE")
        CLOSE_CAMERA_SPACE = os.getenv("KAFKA_TOPICS.CLOSE_CAMERA_SPACE")
        