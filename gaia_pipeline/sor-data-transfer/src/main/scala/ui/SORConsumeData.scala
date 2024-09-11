package ui

import org.apache.kafka.clients.consumer.{ConsumerConfig, KafkaConsumer}
import java.util.Properties
import scala.collection.JavaConverters._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

import domains.TaskInput
import services.SORDataTransfer
import kafka_handler.{SORKafkaHandler, CreateTaskHandler} 
import domains.Constants.KafkaTopic
import kernel.configs.KafkaConfig

class SORConsumerData(config: KafkaConfig) {
  private val consumerProps = new Properties()
  consumerProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, config.bootstrapServers)
  consumerProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer")
  consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer")
  consumerProps.put(ConsumerConfig.GROUP_ID_CONFIG, config.groupId)
  consumerProps.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, config.autoOffsetResetConfig)

  private val consumer = new KafkaConsumer[String, String](consumerProps)
  
  def consumeMessages(): Unit = {
    consumer.subscribe(config.topics.asJava)

    while(true) {
      val records = consumer.poll(1000).asScala
      for (record <- records) {
        println(s"Received message: ${record.value()}")
        if (record.topic() == KafkaTopic.SOR_TRAINING_MODEL) {
          SORKafkaHandler.handleMessage(record.value())
        }
        if (record.topic() == KafkaTopic.CREATE_TASK) {
          CreateTaskHandler.handleMessage(record.value())
        }
      }
    }
  }
}