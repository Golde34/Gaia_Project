package main

import (
	"fmt"
	kafka "golang_kafka/kafka"
	"time"
)

func main() {
	println("Hello, World!")
	// go kafka.StartKafka()
	go kafka.ConsumerHandleMessage()	
	fmt.Println("Kafka started")
	time.Sleep(10 * time.Hour)
}
