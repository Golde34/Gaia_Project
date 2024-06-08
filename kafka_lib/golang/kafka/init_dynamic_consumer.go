package kafka

import "log"

func InitDynamicConsumers() {
	for _, server := range dynamicConsumersEnv {
		log.Println("Starting consumer for server: ", server)
		go ConsumerHandleMessage(server)
	}
}