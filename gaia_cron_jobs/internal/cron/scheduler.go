package cron

import (
	"log"
	"time"

	"gaia_cron_jobs/config"
	"gaia_cron_jobs/internal/kafka"

	"github.com/go-co-op/gocron"
	"github.com/google/uuid"
)

func ExecuteJob() {
	log.Println("Dynamic cron job service started...")
	kafkaConfig, err := config.LoadProducerEnv()
	if err != nil {
		log.Fatal("Failed to load producer config:", err)
	}
	log.Println("Kafka producer initialized")

	scheduler := gocron.NewScheduler(time.UTC)

	for _, job := range kafkaConfig {
		if job.JobTime <= 0 {
			log.Printf("Invalid job time for '%s'. Skipping...", job.JobName)
			continue
		}

		scheduler.Every(job.JobTime).Seconds().Do(func(name, topic, bootstrapServers string) {
			message := uuid.New().String()
			log.Printf("Executing job '%s' and sending message to topic '%s'", name, topic)
			kafka.Producer(bootstrapServers, topic, message, 100_000)
		}, job.JobName, job.Topic, job.BootstrapServers)
	}

	scheduler.StartBlocking()
}
