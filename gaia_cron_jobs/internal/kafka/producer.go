package kafka

import (
	"context"
	kafka_config "gaia_cron_jobs/config"
	"log"
	"sync"
	"time"

	"github.com/IBM/sarama"
)

// KafkaProducer represents the Kafka writer
type KafkaProducer struct {
	kafka_config.JobConfig
}

func Producer(jobName, message string, limit int) {
	config := sarama.NewConfig()
	kafkaConfig, err := kafka_config.LoadProducerEnv()
	if err != nil {
		log.Fatal("Failed to load producer config:", err)
	}
	var producerConfig kafka_config.JobConfig
	for _, config := range kafkaConfig {
		if config.JobName == jobName {
			producerConfig = config
		}
	}

	config.Producer.Return.Errors = true
	config.Producer.Return.Successes = true
	producer, err := sarama.NewAsyncProducer([]string{producerConfig.BootstrapServers}, config)
	if err != nil {
		log.Fatal("NewSyncProducer err:", err)
	}
	var (
		wg                                   sync.WaitGroup
		enqueued, timeout, successed, errors int
	)
	wg.Add(1)
	go func() {
		defer wg.Done()
		for range producer.Successes() {
			successed++
			if successed >= limit {
				break
			}
		}
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		for err := range producer.Errors() {
			log.Println("Failed to write access log entry:", err)
			errors++
			if errors >= limit {
				break
			}
		}
	}()

	msg := &sarama.ProducerMessage{
		Topic: producerConfig.Topic,
		Key:   nil,
		Value: sarama.StringEncoder(message),
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Millisecond*10)
	select {
	case producer.Input() <- msg:
		enqueued++
	case <-ctx.Done():
		timeout++
	}
	cancel()
	if enqueued%10000 == 0 && enqueued != 0 {
		log.Printf("Enqueued messages: %d, timeout: %d\n", enqueued, timeout)
	}

	producer.AsyncClose()
	wg.Wait()
}
