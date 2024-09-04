package kafka_handler

import ujson._
import services.SORDataTransfer
import domains.Constants.KafkaCmd

object SORKafkaHandler {
	def handleMessage(message: String): Unit = {
		val jsonObject = ujson.read(message)
    println(s"Received message: $jsonObject")

		val cmd = jsonObject("cmd").str
		cmd match {
      case KafkaCmd.CSV_SAVING => {
        SORDataTransfer.saveOutputToDataLake()
      }
      case KafkaCmd.DATABASE_SAVING => {
        SORDataTransfer.saveOutputToDatabase()
      }
      case other => {
        println(s"Received message: $other")
      }
		}	
	}
}
