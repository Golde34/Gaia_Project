package kafka

import (
	kafka_config "golang_kafka/config"
	"log"
	"os"

	cluster "github.com/bsm/sarama-cluster"
)

var config = kafka_config.Config{}
var env, _ = config.LoadEnv()

func consumerConfig() (*cluster.Consumer, chan os.Signal) {
	log.Print(env.BootstrapServers)
	// // init (custom) config, set mode to ConsumerModePartitions
	// config := cluster.NewConfig()
	// config.Group.Mode = cluster.ConsumerModePartitions
	// config.Consumer.Offsets.Initial = sarama.OffsetOldest

	// log.Println(env.BootstrapServers)
	// // init consumer
	// brokers := []string{env.BootstrapServers}
	// topics := []string{"test"}
	// consumer, err := cluster.NewConsumer(brokers, "go-consumer-group", topics, config)
	// if err != nil {
	// 	panic(err)
	// }
	// defer consumer.Close()

	// log.Println("Consumer started")
	// // trap SIGINT to trigger a shutdown.
	// signals := make(chan os.Signal, 1)
	// signal.Notify(signals, os.Interrupt)

	// return consumer, signals
	return nil, nil
}

func ConsumerHandleMessage() {
	log.Println("Consumer started handle message")
	// consumer, signals := consumerConfig()
	// consume partitions
	// for {
	// 	select {
	// 	case part, ok := <-consumer.Partitions():
	// 		if !ok {
	// 			return
	// 		}

	// 		// start a separate goroutine to consume messages
	// 		go func(pc cluster.PartitionConsumer) {
	// 			for msg := range pc.Messages() {
	// 				fmt.Fprintf(os.Stdout, "%s/%d/%d\t%s\t%s\n", msg.Topic, msg.Partition, msg.Offset, msg.Key, msg.Value)
	// 				consumer.MarkOffset(msg, "") // mark message as processed
	// 			}
	// 		}(part)
	// 	case <-signals:
	// 		return
	// 	}
	// }
}
