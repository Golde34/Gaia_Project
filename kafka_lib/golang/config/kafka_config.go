package kafka_config

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
)

type KafkaServersNameConfig struct {
	Servers string
}

type Config struct {
	BootstrapServers string
	GroupID          string
	Version          string
	Topics           string
	Assignor         string
	Oldest           bool
	Verbose          bool
	Producers        int
}

func (in *Config) DynamicConsumerLoadEnv() ([]Config, error) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file: ", err)
	}

	servers := GetServersConfig()

	configs := make([]Config, len(servers))

	for _, server := range servers {
		prefix := "KAFKA_CONSUMER"
		kafkaServerConfig := Config{
			BootstrapServers: os.Getenv(prefix + server + "_BOOTSTRAP_SERVERS"),
			GroupID:          os.Getenv(prefix + server + "_GROUP_ID"),
			Version:          os.Getenv(prefix + server + "_VERSION"),
			Topics:           os.Getenv(prefix + server + "_TOPICS"),
			Assignor:         os.Getenv(prefix + server + "_ASSIGNOR"),
			Oldest:           os.Getenv(prefix+server+"_OLDEST") == "true",
			Verbose:          os.Getenv(prefix+server+"_VERBOSE") == "true",
			Producers:        convertInt(os.Getenv(prefix + server + "_PRODUCERS")),
		}
		configs = append(configs, kafkaServerConfig)
	}

	return configs, nil
}

func GetServersConfig() []string {
	servers := os.Getenv("SERVERS")
	serversName := strings.Split(servers, ",")
	return serversName
}

func (in *Config) ProducerLoadEnv() (Config, error) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file: ", err)
	}

	prefix :=  "KAFKA_PRODUCER_"

	bootstrapServer := os.Getenv(prefix+"BOOTSTRAP_SERVERS")
	version := os.Getenv(prefix+"VERSION")
	assignor := os.Getenv(prefix+"ASSIGNOR")
	oldest := os.Getenv(prefix+"OLDEST")
	verbose := os.Getenv(prefix+"VERBOSE")
	producers := convertInt(os.Getenv(prefix+"PRODUCERS"))
	if err != nil {
		log.Fatal("Failed to convert PRODUCERS to integer:", err)
	}
	log.Println("Kafka consumer initialized: {}", bootstrapServer)

	config := Config{
		BootstrapServers: bootstrapServer,
		Version:          version,
		Assignor:         assignor,
		Oldest:           oldest == "true",
		Verbose:          verbose == "true",
		Producers:        producers,
	}

	return config, nil
}

func convertInt(value string) int {
	intValue, err := strconv.Atoi(value)
	if err != nil {
		log.Fatal("Failed to convert value to integer:", err)
	}
	return intValue
}
