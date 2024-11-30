package services

type OptimizeTaskNotifyService struct {}

func NewOptimizeTaskNotifyService() *OptimizeTaskNotifyService {
	return &OptimizeTaskNotifyService{}
}

func (service *OptimizeTaskNotifyService) InitOptimizeTask(userId string, optimizeStatus string) (bool, error) {
	// Save the status that user optimize task success or not
	return true, nil
}