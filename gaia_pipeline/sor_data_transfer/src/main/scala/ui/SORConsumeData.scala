package ui

import org.apache.kafka.clients.consumer.{ConsumerConfig, KafkaConsumer}
import java.util.Properties
import scala.collection.JavaConverters._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

import domains.TaskInput
import services.SORDataTransfer
import kafka_handler.{SORKafkaHandler, CreateTaskHandler, CreateScheduleTaskHandler} 
import domains.Constants.KafkaTopic
import kernel.configs.KafkaConfig

abstract class KafkaHandler {
  def getTopic: String
  def handleMessage(message: String): Unit
}

class SORConsumerData(config: KafkaConfig) {
  private val consumerProps = new Properties()
  consumerProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, config.bootstrapServers)
  consumerProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer")
  consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer")
  consumerProps.put(ConsumerConfig.GROUP_ID_CONFIG, config.groupId)
  consumerProps.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, config.autoOffsetResetConfig)
  consumerProps.put(ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG, "10000")
  consumerProps.put(ConsumerConfig.HEARTBEAT_INTERVAL_MS_CONFIG, "3000")

  private val consumer = new KafkaConsumer[String, String](consumerProps)
  
  private val topicHandlers: Map[String, KafkaHandler] = Map(
    KafkaTopic.SOR_TRAINING_MODEL -> SORKafkaHandler,
    KafkaTopic.CREATE_TASK -> CreateTaskHandler,
    KafkaTopic.SCHEDULE_CREATE_TASK -> CreateScheduleTaskHandler
  )

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