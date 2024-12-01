package services

import (
	"context"
	"log"
	"notify_agent/core/port/store"
	"time"
)

type OptimizeTaskNotifyService struct {
	Store store.NotificationStore
}

func NewOptimizeTaskNotifyService(store *store.NotificationStore) *OptimizeTaskNotifyService {
	return &OptimizeTaskNotifyService{
		Store: *store,
	}
}

func (service *OptimizeTaskNotifyService) InitOptimizeTask(userId string, optimizeStatus string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	log.Println("InitOptimizeTask ", ctx)

	// savedTask, err := service.Store.
	return true, nil
}