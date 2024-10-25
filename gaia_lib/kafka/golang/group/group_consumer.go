package group

import (
	"context"
	"fmt"
	"log"
	"sync"

	"github.com/IBM/sarama"
)

type MyConsumerGroupHandler struct {
	name  string
	count int64
}

// Setup 执行在 获得新 session 后 的第一步, 在 ConsumeClaim() 之前
func (MyConsumerGroupHandler) Setup(_ sarama.ConsumerGroupSession) error { return nil }

// Cleanup 执行在 session 结束前, 当所有 ConsumeClaim goroutines 都退出时
func (MyConsumerGroupHandler) Cleanup(_ sarama.ConsumerGroupSession) error { return nil }

// ConsumeClaim 具体的消费逻辑
func (h MyConsumerGroupHandler) ConsumeClaim(sess sarama.ConsumerGroupSession, claim sarama.ConsumerGroupClaim) error {
	for {
		select {
		case msg, ok := <-claim.Messages():
			if !ok {
				return nil
			}
			fmt.Printf("[consumer] name:%s topic:%q partition:%d offset:%d\n", h.name, msg.Topic, msg.Partition, msg.Offset)
			fmt.Printf("[consumer] name:%s value:%s\n", h.name, string(msg.Value))
			// 标记消息已被消费 内部会更新 consumer offset
			sess.MarkMessage(msg, "")
			h.count++
			if h.count%10000 == 0 {
				fmt.Printf("name:%s 消费数:%v\n", h.name, h.count)
			}

		// Should return when `session.Context()` is done.
		// If not, will raise `ErrRebalanceInProgress` or `read tcp <ip>:<port>: i/o timeout` when kafka rebalance. see:
		// https://github.com/Shopify/sarama/issues/1192
		case <-sess.Context().Done():
			return nil
		}
	}
}

func ConsumerGroup(topics []string, group, name string) {
	config := sarama.NewConfig()
	config.Consumer.Return.Errors = true // 指定返回错误
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	cg, err := sarama.NewConsumerGroup([]string{"localhost:9094"}, group, config)
	if err != nil {
		log.Fatal("NewConsumerGroup err: ", err)
	}
	defer cg.Close()
	var wg sync.WaitGroup
	wg.Add(2)
	// 错误处理
	go func() {
		defer wg.Done()
		for err = range cg.Errors() {
			fmt.Println("ERROR", err)
		}
	}()
	go func() {
		defer wg.Done()
		handler := MyConsumerGroupHandler{name: name}
		for {
			fmt.Println("running: ", name)
			/*
				![important]
				应该在一个无限循环中不停地调用 Consume()
				因为每次 Rebalance 后需要再次执行 Consume() 来恢复连接
				Consume 开始才发起 Join Group 请求 如果当前消费者加入后成为了 消费者组 leader,则还会进行 Rebalance 过程，从新分配
				组内每个消费组需要消费的 topic 和 partition，最后 Sync Group 后才开始消费
				具体信息见 https://github.com/lixd/kafka-go-example/issues/4
			*/
			err = cg.Consume(ctx, topics, handler)
			if err != nil {
				log.Println("Consume err: ", err)
			}
			// 如果 context 被 cancel 了，那么退出
			if ctx.Err() != nil {
				return
			}
		}
	}()
	wg.Wait()
}