package kafka_handler 

import ujson._
import domains.Constants.{KafkaTopic, KafkaCmd}
import ui.KafkaHandler
import services.UploadFileService.{handleInitCommand}

object UploadRAGFileHandler extends KafkaHandler {
    override def getTopic: String = KafkaTopic.UPLOAD_RAG_FILE

    override def handleMessage(message: String): Unit = {
        val jsonObject = ujson.read(message)

        val dataObject = jsonObject("data")
        val cmd = jsonObject.obj.get("cmd").map(_.str).getOrElse("")

        cmd match {
            case KafkaCmd.GAIA_INIT_UPLOAD_FILE => {
                handleInitCommand() 
            }
        }
    }
}