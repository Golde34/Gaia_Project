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
	log.Println("Kafka producer initialized: {}", kafkaConfig)
	scheduler := gocron.NewScheduler(time.UTC)

	var cronJob config.JobConfig
	for _, job := range kafkaConfig {
		log.Println("Job: ", job)
		if err != nil {
			log.Fatalf("Invalid time configuration for cron '%s': %v", job.JobName, err)
		}
		go scheduler.Every(job.JobTime).Seconds().Do(func(name, topic, p string) {
				message := uuid.New().String()
			go kafka.Producer(cronJob.BootstrapServers, cronJob.Topic, message, 100_000)
		}, cronJob.JobName, cronJob.Topic, cronJob.BootstrapServers)
	}

	scheduler.StartBlocking()
}
