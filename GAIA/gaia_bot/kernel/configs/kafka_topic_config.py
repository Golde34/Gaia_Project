from gaia_bot.domain.enums import AcronymsEnum


KAFKA_TOPICS = {
    AcronymsEnum.CMC.value: {
        'kafka_topics': [
            'OPEN_CAMERA_SPACE_TOPIC',
            'SHUTDOWN_CAMERA_SPACE_TOPIC'
        ],
    },
}