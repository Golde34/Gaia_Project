package main

import "golang_kafka/producer/sync"

func main() {
	sync.Producer("test", 100)
}