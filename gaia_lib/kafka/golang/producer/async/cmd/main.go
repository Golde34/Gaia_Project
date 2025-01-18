package main

import "golang_kafka/producer/async"

func main() {
	async.Producer("test", 100_0000)	
}