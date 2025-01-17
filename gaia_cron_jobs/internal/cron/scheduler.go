package cron

import (
	"fmt"
	"time"

	"gaia_cron_jobs/internal/kafka"
)

// ExecuteJob is a generic job handler
func ExecuteJob(name, topic string, producer *kafka.KafkaProducer) {
	message := fmt.Sprintf("Cron '%s' executed at %s", name, time.Now().Format(time.RFC3339))
	err := producer.Publish(message)
	if err != nil {
		fmt.Printf("Error publishing message for cron '%s': %v\n", name, err)
	} else {
		fmt.Printf("Cron '%s' successfully pushed message to Kafka topic '%s'.\n", name, topic)
	}
}
