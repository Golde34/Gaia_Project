package services

import producer.{KafkaMessage, RunKafkaProducer}
import domains.Constants

object UploadFileService {
    def handleInitCommand(): Unit = {
        // Store file metadata to database
        // Push kafka object to kafka
        val time = System.currentTimeMillis().toString
        val data = Map(
            "message" -> "Init upload file success, upload to data storage",
        )
        val kafkaMessage = new KafkaMessage(Constants.KafkaCmd.GAIA_INIT_UPLOAD_FILE, "00", "Success", time, data)
        RunKafkaProducer(Constants.KafkaTopic.UPLOAD_RAG_FILE, kafkaMessage.toString())        
    }
}