import ujson._
import scala.collection.mutable.ArrayBuffer
import os._
import services.SORDataTransfer
import ui.SORConsumerData
import kernel.configs.{KafkaConfig, KafkaConfigLoader}

object DataPipeline {
  def main(args: Array[String]): Unit = {
    val kafkaConfig: KafkaConfig = KafkaConfigLoader.loadKafkaConfig()

    SORDataTransfer.saveOutputToDataLake() 
    // SORDataTransfer.saveOutputToDatabase()

    val sorConsumerData = new SORConsumerData(kafkaConfig)
    sorConsumerData.consumeMessages()
  }
}