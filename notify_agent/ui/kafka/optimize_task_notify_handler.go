package consumer

type OptimizeTaskNotifyHandler struct {}

func (handler *OptimizeTaskNotifyHandler) HandleMessage(topic string, key, value []byte) {
	// Implement your logic here
}