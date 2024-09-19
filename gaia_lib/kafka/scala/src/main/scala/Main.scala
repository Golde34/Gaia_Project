import ui.DSConsumer
import kernel.configs.{KafkaConfig, KafkaConfigLoader}
import ui.KafkaHandler

object DataStorage {
  def main(args: Array[String]): Unit = {
    println("Data Storage")

    val kafkaConfig: KafkaConfig = KafkaConfigLoader.loadKafkaConfig()

    val consumer = new DSConsumer(kafkaConfig)
    consumer.consumeMessages()
  }
}