package services

import "notify_agent/core/port/store"

type OptimizeTaskNotifyService struct {
	Store store.NotificationStore
}

func NewOptimizeTaskNotifyService(store *store.NotificationStore) *OptimizeTaskNotifyService {
	return &OptimizeTaskNotifyService{
		Store: *store,
	}
}

func (service *OptimizeTaskNotifyService) InitOptimizeTask(userId string, optimizeStatus string) (bool, error) {
	// Save the status that user optimize task success or not
	return true, nil
}