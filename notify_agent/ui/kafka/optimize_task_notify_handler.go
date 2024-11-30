package consumer

import (
	"encoding/json"
	"fmt"
	"log"
	"notify_agent/core/domain/constants"
	base_dtos "notify_agent/core/domain/dtos/base"
	services "notify_agent/core/services/work_optimization"
)

type OptimizeTaskNotifyHandler struct {}

func (handler *OptimizeTaskNotifyHandler) HandleMessage(topic string, key, value []byte) {
	fmt.Printf("Handling message for topic %s: %s\n", topic, string(value))

	var message base_dtos.KafkaMessage
	if err := json.Unmarshal(value, &message); err != nil {
		fmt.Printf("Error unmarshalling message: %s\n", err)
		return
	}

	data, ok := message.Data.(map[string]interface{})
	if !ok {
		fmt.Println("Error casting message data")
		return
	}

	switch message.Cmd {
	case constants.InitOptimizeTaskCmd:
		fmt.Printf("Optimize task notification received: %v\n", data)
	case constants.FinalizeOptimizeTaskCmd:
		fmt.Printf("Optimize task finalization notification received: %v\n", data)
	default:
		log.Println("Message handled successfully, but the cmd does not match to consumer to process")
	}
}

func InitOptimizeTaskCmd(data map[string]interface{}) {
	userId, ok := data["userId"].(string)
	if !ok {
		fmt.Println("Error casting userId")
		return
	}
	optimizeStatus, ok := data["optimizeStatus"].(string)
	if !ok {
		fmt.Println("Error casting optimizeStatus")
		return
	}
	optimNotify := services.NewOptimizeTaskNotifyService()
	result, err := optimNotify.InitOptimizeTask(userId, optimizeStatus)
	if err != nil {
		fmt.Println("Error initializing optimize task")
		return
	}
	fmt.Printf("Optimize task initialized successfully: %v\n", result)
	
}