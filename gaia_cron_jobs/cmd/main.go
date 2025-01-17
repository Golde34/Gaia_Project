package main

import (
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"gaia_cron_jobs/internal/cron"
	"gaia_cron_jobs/internal/kafka"

	"github.com/go-co-op/gocron"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	// Load Kafka configuration
	kafkaBroker := os.Getenv("KAFKA_BROKER")

	// Load cron names
	cronNames := strings.Split(os.Getenv("CRON_NAME"), ",")

	// Initialize scheduler
	scheduler := gocron.NewScheduler(time.UTC)

	for _, cronName := range cronNames {
		// Load specific time and topic for each cron
		timeEnv := "CRON_TIME_" + strings.ToUpper(cronName)
		topicEnv := "CRON_TOPIC_" + strings.ToUpper(cronName)

		cronTimeStr := os.Getenv(timeEnv)
		cronTopic := os.Getenv(topicEnv)

		if cronTimeStr == "" || cronTopic == "" {
			log.Fatalf("Missing configuration for cron '%s'. Ensure %s and %s are set.", cronName, timeEnv, topicEnv)
		}

		// Parse time
		cronTime, err := strconv.Atoi(cronTimeStr)
		if err != nil {
			log.Fatalf("Invalid time configuration for cron '%s': %v", cronName, err)
		}

		// Create Kafka producer
		producer := kafka.NewProducer(kafkaBroker, cronTopic)
		defer producer.Close()

		// Register cron job
		scheduler.Every(cronTime).Minutes().Do(func(name, topic string, p *kafka.KafkaProducer) {
			cron.ExecuteJob(name, topic, p)
		}, cronName, cronTopic, producer)
	}

	// Start scheduler
	log.Println("Dynamic cron job service started...")
	scheduler.StartBlocking()
}
