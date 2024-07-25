package kafka

import kafka_config "golang_kafka/config"

var config = kafka_config.Config{}
var producerEnv, _ = config.ProducerLoadEnv()
var dynamicConsumersEnv, _ = config.DynamicConsumerLoadEnv()