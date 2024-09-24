package ui

import org.apache.kafka.clients.consumer.{ConsumerConfig, KafkaConsumer}
import kernel.configs.KafkaConfig
import java.util.Properties
import domains.Constants.KafkaTopic
import kafka_handler.UploadRAGFileHandler
import scala.collection.JavaConverters._

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

    private val topics: List[String] = config.topics
    private val consumer = new KafkaConsumer[String, String](consumerProps)

    private val topicHandlers: Map[String, KafkaHandler] = Map(
        KafkaTopic.UPLOAD_RAG_FILE -> UploadRAGFileHandler
    )

    def consumeMessages(): Unit = {
        consumer.subscribe(topics.asJava)

        while(true) {
            val records = consumer.poll(1000).asScala
            for (record <- records) {
                val topic = record.topic()

                topicHandlers.get(topic) match {
                    case Some(handler) => handler.handleMessage(record.value())
                    case None => println(s"No handler found for topic: $topic")
                }
            }
        }
    }
}