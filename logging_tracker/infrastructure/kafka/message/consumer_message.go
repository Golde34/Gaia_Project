package kafka_message

import "strings"

type HandleMessage interface {
	ConsumeMessage(message string, topic string) (string, error)
}

func ConsumeMessage(message string, topic string) (string, error) {
	consumerResult := strings.Join([]string{message, topic}, " with topic: ")
	return consumerResult, nil
}