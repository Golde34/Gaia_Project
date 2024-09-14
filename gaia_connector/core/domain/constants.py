class Constants:
    class KafkaTopic:
        CREATE_TASK_TOPIC = "task-manager.create-task.topic"
        OPEN_CAMERA_SPACE = "OPEN_CAMERA_SPACE"

    class StringConstants:
        kafka_topic_prefix = "KAFKA_TOPICS."
        status = "status"
        response = "response" 
        message = "message"

    class KafkaCommand:
        GAIA_CREATE_TASK = "gaiaCreateTask"