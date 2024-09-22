package producer

case class KafkaMessage(cmd: String, errorCode: String, errorMessage: String, displayTime: String, data: Map[String, String]) {
    def kafkaMessageMapper = {
        Map(
            "cmd" -> cmd,
            "errorCode" -> errorCode,
            "errorMessage" -> errorMessage,
            "displayTime" -> displayTime,
            "data" -> data
        )
    }
}