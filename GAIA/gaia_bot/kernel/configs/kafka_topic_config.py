from gaia_bot.domain.enums import AcronymsEnum
from gaia_bot.infrastructures.kafka.kafka_listener import handle_open_camera_space

KAFKA_TOPICS_FUNCTION = {
    AcronymsEnum.CMC.value: handle_open_camera_space,
}