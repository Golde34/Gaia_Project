package kafka_config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	BootstrapServers string
}

func (in *Config) LoadEnv() (Config, error) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file: ", err)
	}

	bootstrapServer := os.Getenv("BOOTSTRAP_SERVERS")
	config := Config {
		BootstrapServers: bootstrapServer,
	}
	
	return config, nil
}