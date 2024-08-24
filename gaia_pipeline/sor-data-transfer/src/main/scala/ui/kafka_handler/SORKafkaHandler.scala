package kafka_handler

import ujson._
import services.SORDataTransfer
import domains.Constants.KafkaCmd

object SORKafkaHandler {
	def handleMessage(message: String): Unit = {
		val jsonObject = ujson.read(message)

		val cmd = jsonObject("cmd").str
		cmd match {
			case KafkaCmd.ACTIVATE_DATA_LAKE_SAVING => {
        val isSaving = jsonObject("data")("isSaving").bool
        val saveToDB = jsonObject("data")("saveToDB").bool
        val saveToCSV = jsonObject("data")("saveToCSV").bool
        println(s"Received message: $cmd with data: $isSaving")
        if (isSaving) {
          if (saveToCSV) {
            SORDataTransfer.writeOutputToJSONFile()
          }
          if (saveToDB) {
            SORDataTransfer.saveOutputToDatabase()
          }
        }
			}
      case other => {
        println(s"Received message: $other")
      }
		}	
	}
}

object CreateTaskHandler {
  def handleMessage(message: String): Unit = {
    val jsonObject = ujson.read(message)
    println(s"Received message: ${jsonObject}")
  }
}