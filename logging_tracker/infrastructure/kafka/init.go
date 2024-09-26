package kafka

import kafka_config "logging_tracker/kernel/configs"

var config = kafka_config.KafkaConfig{}
var producerEnv, _ = config.ProducerLoadEnv()
var dynamicConsumersEnv, _ = config.DynamicConsumerLoadEnv()