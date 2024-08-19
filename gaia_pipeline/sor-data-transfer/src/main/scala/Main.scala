import ujson._
import scala.collection.mutable.ArrayBuffer
import os._
import services.SORDataTransfer
import ui.SORConsumerData

object DataPipeline {
  def main(args: Array[String]): Unit = {
    // SORDataTransfer.writeOutputToJSONFile() 
    val kafkaTopic = "GC.sor-training-model" 
    val bootstrapServers = "localhost:9094"

    val sorConsumerData = new SORConsumerData(kafkaTopic, bootstrapServers)
    // sorConsumerData.consumerMessages()
    sorConsumerData.consumeAndPrintMessages()
  }
}