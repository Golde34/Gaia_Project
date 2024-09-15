from dotenv import load_dotenv
import os


load_dotenv()

class Constants:
    class KafkaTopic:
        CREATE_TASK_TOPIC = os.getenv("KAFKA_TOPICS.CREATE_TASK_TOPIC")
        OPEN_CAMERA_SPACE = os.getenv("KAFKA_TOPICS.OPEN_CAMERA_SPACE")
        CLOSE_CAMERA_SPACE = os.getenv("KAFKA_TOPICS.CLOSE_CAMERA_SPACE")

    class StringConstants:
        status = "status"
        response = "response" 
        message = "message"

    class KafkaCommand:
        GAIA_CREATE_TASK = "gaiaCreateTask"

    class FileExtensions:
        ALLOWED_EXTENSIONS = {'txt', 'pdf', 'json', 'csv', 'xlsx', 'xls', 'doc', 'docx'}