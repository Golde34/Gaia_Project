package services

import producer.{KafkaMessage, RunKafkaProducer}
import domains.Constants

object UploadFileService {
    def handleInitCommand(file_name: Option[String], file_id: Option[String]): Unit = {
        // Store file metadata to database
        // Push kafka object to kafka
        val time = System.currentTimeMillis().toString
        val data = Map(
            "file_name" -> file_name.getOrElse(""),
            "file_id" -> file_id.getOrElse(""),
            "message" -> "Receive file metadata, start uploading file",
        )
        val kafkaMessage = new KafkaMessage(Constants.KafkaCmd.PIPELINE_INIT_UPLOAD_FILE_RESULT, "00", "Success", time, data)
        val messageJson = kafkaMessage.toJsonString()
        RunKafkaProducer.apply(Constants.KafkaTopic.PIPELINE_UPLOAD_RAG_FILE, messageJson)
    }

    def handleFailedCommand(file_name: Option[String], file_id: Option[String]): Unit = {
        // Store file metadata to database
        print("Handle failed case") 
    }
}