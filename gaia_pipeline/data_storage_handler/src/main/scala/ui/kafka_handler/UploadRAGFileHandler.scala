package kafka_handler 

import ujson._
import domains.Constants.{KafkaTopic, KafkaCmd}
import ui.KafkaHandler
import services.UploadFileService.{handleInitCommand, handleFailedCommand}

object UploadRAGFileHandler extends KafkaHandler {
    override def getTopic: String = KafkaTopic.UPLOAD_RAG_FILE

    override def handleMessage(message: String): Unit = {
        println("Received message: " + message)
        val jsonObject = ujson.read(message)

        val dataObject = jsonObject("data")
        val cmd = jsonObject.obj.get("cmd").map(_.str).getOrElse("")

        cmd match {
            case KafkaCmd.GAIA_INIT_UPLOAD_FILE => {
                handleInitCommand(dataObject.obj.get("file_name").map(_.str), dataObject.obj.get("file_id").map(_.str)) 
            }
            case KafkaCmd.GAIA_FAILED_UPLOAD_FILE => {
                handleFailedCommand(dataObject.obj.get("file_name").map(_.str), dataObject.obj.get("file_id").map(_.str))
            }
        }
    }
}