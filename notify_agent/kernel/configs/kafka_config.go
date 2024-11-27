package configs

import (
	"fmt"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type KafkaConfig struct {
	BootstrapServers string
	GroupId          string
	Topics           []string
	Name             string
}

func (in *KafkaConfig) LoadEnv() (KafkaConfig, error) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file: ", err)
	}

	bootstrapServers := os.Getenv("BOOTSTRAP_SERVERS")
	groupId := os.Getenv("GROUP_ID")
	topics := os.Getenv("TOPICS")
	name := os.Getenv("NAME")

	return KafkaConfig{
		BootstrapServers: bootstrapServers,
		GroupId:          groupId,
		Topics:           strings.Split(topics, ","),
		Name:             name,
	}, nil
}
