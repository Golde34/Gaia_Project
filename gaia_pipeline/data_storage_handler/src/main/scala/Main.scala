object DataStorage {
  def main(args: Array[String]): Unit = {
    println("Data Storage")

    val kafkaConfig: KafkaConfig = KafkaConfigLoader.loadKafkaConfig()

    val consumer = new DSConsumer(kafkaConfig)
    consumer.consumeMessages()
  }
}