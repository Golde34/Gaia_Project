package producer

import ujson._

case class KafkaMessage(cmd: String, errorCode: String, errorMessage: String, displayTime: String, data: Map[String, String]) {
    def toJsonString(): String = {
        ujson.write(ujson.Obj.from(Map(
            "cmd" -> cmd,
            "errorCode" -> errorCode,
            "errorMessage" -> errorMessage,
            "displayTime" -> displayTime,
            "data" -> data
        )))
    }
}