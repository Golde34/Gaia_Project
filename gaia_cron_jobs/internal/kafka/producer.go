package kafka

import (
	"context"
	"fmt"
	"log"
	"time"
)

// KafkaProducer represents the Kafka writer
type KafkaProducer struct {
	// writer *kafka.Writer
}

// NewProducer creates a new Kafka producer
// func NewProducer(broker, topic string) *KafkaProducer {
// 	return &KafkaProducer{
// 		writer: &kafka.Writer{
// 			Addr:         kafka.TCP(broker),
// 			Topic:        topic,
// 			Balancer:     &kafka.LeastBytes{},
// 			RequiredAcks: kafka.RequireAll,
// 		},
// 	}
// }

// Publish sends a message to Kafka
// func (kp *KafkaProducer) Publish(message string) error {
// 	err := kp.writer.WriteMessages(context.Background(),
// 		kafka.Message{
// 			Key:   []byte(fmt.Sprintf("Key-%d", time.Now().UnixNano())),
// 			Value: []byte(message),
// 		},
// 	)
// 	if err != nil {
// 		log.Printf("Failed to publish message: %v", err)
// 		return err
// 	}
// 	log.Printf("Message published to Kafka: %s", message)
// 	return nil
// }

// // Close closes the Kafka writer
// func (kp *KafkaProducer) Close() {
// 	kp.writer.Close()
// }
