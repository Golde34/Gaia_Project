package domains

case class GeneralKafkaMessage(
    cmd: String,
    data: Object
)