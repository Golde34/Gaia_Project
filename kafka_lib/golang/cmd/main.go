package main

import (
	"fmt"
	kafka "golang_kafka/kafka"
	"time"
)

func main() {
	println("Hello, World!")
	fmt.Print("Starting kafka consumer")
	go kafka.InitDynamicConsumers()
	message := "test"
	kafka.ProducerHandleMessage(message, "test")
	// go kafka.ProducerHandleMessage("test")
	fmt.Println("Kafka started")
	time.Sleep(10 * time.Hour)
}
