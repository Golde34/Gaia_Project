package kafka_config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	BootstrapServers string
	GroupID          string
	Version          string
	Topics           string
	Assignor         string
	Oldest           bool
	Verbose          bool
}

func (in *Config) LoadEnv() (Config, error) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file: ", err)
	}

	bootstrapServer := os.Getenv("BOOTSTRAP_SERVERS")
	groupId := os.Getenv("GROUP_ID")
	version := os.Getenv("VERSION")
	topics := os.Getenv("TOPICS")
	assignor := os.Getenv("ASSIGNOR")
	oldest := os.Getenv("OLDEST")
	verbose := os.Getenv("VERBOSE")
	log.Printf("Kafka consumer initialized: ", bootstrapServer)

	config := Config{
		BootstrapServers: bootstrapServer,
		GroupID:          groupId,
		Version:          version,
		Topics:           topics,
		Assignor:         assignor,
		Oldest:           oldest == "true",
		Verbose:          verbose == "true",
	}

	return config, nil
}
