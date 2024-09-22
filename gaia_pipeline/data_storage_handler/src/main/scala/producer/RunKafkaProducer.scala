package producer

import java.util.Properties
import kernel.configs.{KafkaConfigLoader, KafkaConfig}
import java.util.UUID

object RunKafkaProducer {
    def apply(topic: String, value: String): Unit = {
        val config: KafkaConfig = KafkaConfigLoader.loadKafkaConfig()
        val producer = new Producer(config)
        val key = UUID.randomUUID().toString
        producer.send(topic, key, value)
    }
}
