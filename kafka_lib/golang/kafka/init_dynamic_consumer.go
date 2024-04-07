package kafka

func InitDynamicConsumers() {
	for _, server := range dynamicConsumersEnv {
		go ConsumerHandleMessage(server)
	}
}