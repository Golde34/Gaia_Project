package kafka_handler

import ujson._
import services.SORDataTransfer

object SORKafkaHandler {
	def handleMessage(message: String): Unit = {
		val jsonObject = ujson.read(message)

		val cmd = jsonObject("cmd").str
		cmd match {
			case "activateDataLakeSaving" => {
        val isSaving = jsonObject("data")("isSaving").bool
        val saveToDB = jsonObject("data")("saveToDB").bool
        val saveToCSV = jsonObject("data")("saveToCSV").bool
        println(s"Received message: $cmd with data: $isSaving")
        println(s"Received message: $cmd with data: $saveToDB")
        println(s"Received message: $cmd with data: $saveToCSV")
        // println(s"Received message: $cmd with data: $isSaving")
        // if (isSaving) {
        //   if (saveToCSV) {
        //     SORDataTransfer.writeOutputToJSONFile()
        //   }
        //   if (saveToDB) {
        //     SORDataTransfer.saveOutputToDatabase()
        //   }
        // }
			}
      case other => {
        println(s"Received message: $other")
      }
		}	
	}
}
