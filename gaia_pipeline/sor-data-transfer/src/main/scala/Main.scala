import ujson._
import scala.collection.mutable.ArrayBuffer
import os._
import services.SORDataTransfer

object DataPipeline {
  def main(args: Array[String]): Unit = {
    SORDataTransfer.writeOutputToJSONFile()  
  }
}