package ui

import org.apache.kafka.clients.consumer.{ConsumerConfig, KafkaConsumer}
import java.util.Properties
import scala.collection.JavaConverters._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

import domains.TaskInput
import services.SORDataTransfer
import kafka_handler.{SORKafkaHandler, CreateTaskHandler} 

class SORConsumerData() {
  private val kafkaTopics = List("GC.sor-training-model", "gc.create-task.topic")
  private val bootstrapServers = "localhost:9094"

  private val consumerProps = new Properties()
  consumerProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers)
  consumerProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer")
  consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer")
  consumerProps.put(ConsumerConfig.GROUP_ID_CONFIG, "sor-data-transfer")
  consumerProps.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest")

  private val consumer = new KafkaConsumer[String, String](consumerProps)

  def consumeMessages(): Unit = {
    consumer.subscribe(kafkaTopics.asJava)

    while(true) {
      val records = consumer.poll(1000).asScala
      for (record <- records) {
        println(s"Received message: ${record.value()}")
        if (record.topic() == "GC.sor-training-model") {
          SORKafkaHandler.handleMessage(record.value())
        }
        if (record.topic() == "gc.create-task.topic") {
          // val taskInput = TaskInput.fromJson(record.value())
          CreateTaskHandler.handleMessage(record.value())
        }
      }
    }
  }
}