package ui

import org.apache.kafka.clients.consumer.{ConsumerConfig, KafkaConsumer}
import kernel.configs.KafkaConfig
import java.util.Properties

abstract class KafkaHandler {
  def getTopic: String
  def handleMessage(message: String): Unit
}

class DSConsumer(config: KafkaConfig) {
    private val consumerProps = new Properties()
    consumerProps.put("bootstrap.servers", config.bootstrapServers)
    consumerProps.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer")
    consumerProps.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer")
    consumerProps.put("group.id", config.groupId)
    consumerProps.put("auto.offset.reset", config.autoOffsetResetConfig)
    consumerProps.put("session.timeout.ms", "10000")
    consumerProps.put("heartbeat.interval.ms", "3000")

    private val consumer = new KafkaConsumer[String, String](consumerProps)

    def consumeMessages(): Unit = {
        consumer.subscribe(config.topics.asJava)

        while(true) {
            val records = consumer.poll(1000).asScala
            for (record <- records) {
                println(s"Received message: ${record.value()}")
                val topic = record.topic()

                topicHandlers.get(topic) match {
                    case Some(handler) => handler.handleMessage(record.value())
                    case None => println(s"No handler found for topic: $topic")
                }
            }
        }
    }
}