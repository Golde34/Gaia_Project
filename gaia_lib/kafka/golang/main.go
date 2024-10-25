package main

import "golang_kafka/group"

func main() {
	// 测试: 该topics创建时只指定两个分区，然后启动3个消费者进行消费，
	// 结果: 最终只有两个消费者能够消费到消息
	// Appreciate to Chinese Wizard <||>
	topics := []string{"task-manager.upload-note-file.topic", "test"}
	go group.ConsumerGroup(topics, "conf.ConsumerGroupID1", "C1")
	go group.ConsumerGroup(topics, "conf.ConsumerGroupID2", "C2")
	group.ConsumerGroup(topics, "conf.ConsumerGroupID3", "C3")
}