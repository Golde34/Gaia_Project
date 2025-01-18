package kafka

import (
	"context"
	"log"
	"sync"
	"time"

	"github.com/IBM/sarama"
	"github.com/google/uuid"
)

func Producer(bootstrapServer, topic, message string, limit int) {
	config := sarama.NewConfig()

	config.Producer.Return.Errors = true
	config.Producer.Return.Successes = true
	producer, err := sarama.NewAsyncProducer([]string{bootstrapServer}, config)
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
		Topic: topic,
		Key:   sarama.StringEncoder(uuid.New().String()),
		Value: sarama.StringEncoder(message),
	}
	log.Printf("Message: %s\n", message)
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
