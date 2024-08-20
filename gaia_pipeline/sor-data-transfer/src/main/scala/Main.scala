import ujson._
import scala.collection.mutable.ArrayBuffer
import os._
import services.SORDataTransfer
import ui.SORConsumerData

object DataPipeline {
  def main(args: Array[String]): Unit = {
    SORDataTransfer.writeOutputToJSONFile() 

    val sorConsumerData = new SORConsumerData()
    sorConsumerData.consumeMessages()
  }
}