package kafka_handler

import ujson._

object SORKafkaHandler {
	def handleMessage(message: String): Unit = {
		val jsonObject = ujson.read(message)
		val sentence = jsonObject("sentence").str
	}
}