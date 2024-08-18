import ujson._
import scala.collection.mutable.ArrayBuffer
import os._
import services.SORDataTransfer
import com.typesafe.config.ConfigFactory

object DataPipeline {

  def main(args: Array[String]): Unit = {
    val config = ConfigFactory.load()
    println(config.getConfig("slick.dbs.default").root().render()) // Debug output để kiểm tra cấu hình
    SORDataTransfer.writeOutputToJSONFile()  
  }
}