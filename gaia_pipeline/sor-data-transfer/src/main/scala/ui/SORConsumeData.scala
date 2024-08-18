package ui

import org.apache.kafka.clients.consumer.{ConsumerConfig, KafkaConsumer}
import java.util.Properties
import scala.collection.JavaConverters._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

import domains.TaskInput

class SORConsumerData(kafkaTopic: String, bootstrapServers: String) {
  private val consumerProps = new Properties()
  consumerProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers)
  consumerProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer")
  consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer")
  consumerProps.put(ConsumerConfig.GROUP_ID_CONFIG, "sor-data-transfer")
  consumerProps.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest")

  private val consumer = new KafkaConsumer[String, String](consumerProps)

  // def consumerMessages(): Future[Seq[TaskInput]] = Future {
  //   consumer.subscribe(List(kafkaTopic).asJava)
  //   val records = consumer.poll(1000)
    
  //   val taskInputs = records.iterator().asScala.map { record =>
  //     // val taskInput = TaskInput.fromJson(record.value())
  //     val taskInput = record.value()
  //     println(s"Consumed task input: $taskInput")
  //     taskInput
  //   }.toSeq
    
  //   taskInputs
  // }

  def consumeAndPrintMessages(): Unit = {
    consumer.subscribe(List(kafkaTopic).asJava)

    while (true) {
      val records = consumer.poll(1000).asScala
      for (record <- records) {
        println(s"Received message: ${record.value()}")
      }
    }
  }
}