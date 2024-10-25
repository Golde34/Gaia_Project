
package kafka 

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

func (MyConsumerGroupHandler) Setup(_ sarama.ConsumerGroupSession) error { return nil }

func (MyConsumerGroupHandler) Cleanup(_ sarama.ConsumerGroupSession) error { return nil }

func (h MyConsumerGroupHandler) ConsumeClaim(sess sarama.ConsumerGroupSession, claim sarama.ConsumerGroupClaim) error {
	for {
		select {
		case msg, ok := <-claim.Messages():
			if !ok {
				return nil
			}
			fmt.Printf("[consumer] name:%s topic:%q partition:%d offset:%d\n", h.name, msg.Topic, msg.Partition, msg.Offset)
			fmt.Printf("[consumer] name:%s value:%s\n", h.name, string(msg.Value))
			sess.MarkMessage(msg, "")
			h.count++
			if h.count%10000 == 0 {
				fmt.Printf("name:%s 消费数:%v\n", h.name, h.count)
			}

		case <-sess.Context().Done():
			return nil
		}
	}
}

func ConsumerGroup(topics []string, group, name string) {
	config := sarama.NewConfig()
	config.Consumer.Return.Errors = true 
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	cg, err := sarama.NewConsumerGroup([]string{"localhost:9094"}, group, config)
	if err != nil {
		log.Fatal("NewConsumerGroup err: ", err)
	}
	defer cg.Close()
	var wg sync.WaitGroup
	wg.Add(2)
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
			err = cg.Consume(ctx, topics, handler)
			if err != nil {
				log.Println("Consume err: ", err)
			}
			if ctx.Err() != nil {
				return
			}
		}
	}()
	wg.Wait()
}