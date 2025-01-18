package sync

import (
	"fmt"
	kafka_config "golang_kafka/config"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/IBM/sarama"
	"github.com/joho/godotenv"
)

func ProducerLoadEnv() (kafka_config.Config, error) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file: ", err)
	}

	prefix := "KAFKA_PRODUCER_"

	bootstrapServer := os.Getenv(prefix + "BOOTSTRAP_SERVERS")
	version := os.Getenv(prefix + "VERSION")
	assignor := os.Getenv(prefix + "ASSIGNOR")
	oldest := os.Getenv(prefix + "OLDEST")
	verbose := os.Getenv(prefix + "VERBOSE")
	producers := kafka_config.ConvertInt(os.Getenv(prefix + "PRODUCERS"))
	if err != nil {
		log.Fatal("Failed to convert PRODUCERS to integer:", err)
	}
	log.Println("Kafka consumer initialized: {}", bootstrapServer)

	config := kafka_config.Config{
		BootstrapServers: bootstrapServer,
		Version:          version,
		Assignor:         assignor,
		Oldest:           oldest == "true",
		Verbose:          verbose == "true",
		Producers:        producers,
	}

	return config, nil
}

func Producer(topic string, limit int) {
	config := sarama.NewConfig()
	kafkaConfig, err := ProducerLoadEnv()
	if err != nil {
		log.Fatal("Failed to load producer config:", err)
	}

	config.Producer.Return.Successes = true
	config.Producer.Return.Errors = true // 这个默认值就是 true 可以不用手动 赋值

	producer, err := sarama.NewSyncProducer([]string{kafkaConfig.BootstrapServers}, config)
	if err != nil {
		log.Fatal("NewSyncProducer err:", err)
	}
	defer producer.Close()
	var successes, errors int
	for i := 0; i < limit; i++ {
		str := strconv.Itoa(int(time.Now().UnixNano()))
		msg := &sarama.ProducerMessage{Topic: topic, Key: nil, Value: sarama.StringEncoder(str)}
		partition, offset, err := producer.SendMessage(msg) // 发送逻辑也是封装的异步发送逻辑，可以理解为将异步封装成了同步
		if err != nil {
			log.Printf("SendMessage:%d err:%v\n ", i, err)
			errors++
			continue
		}
		successes++
		log.Printf("[Producer] partitionid: %d; offset:%d, value: %s\n", partition, offset, str)
	}
	log.Printf("发送完毕 总发送条数:%d successes: %d errors: %d\n", limit, successes, errors)
}
