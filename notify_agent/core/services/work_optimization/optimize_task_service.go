package services

import (
	"context"
	"log"
	"notify_agent/core/port/mapper"
	"notify_agent/core/port/store"
	services "notify_agent/core/services/websocket"
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

func (service *OptimizeTaskNotifyService) InitOptimizeTask(messageId, userId, optimizedStatus, notificationIdFlow string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	log.Println("InitOptimizeTask ", ctx)

	request := mapper.InsertOptimizeTaskRequestMapper(messageId, userId, optimizedStatus, notificationIdFlow) 

	savedTask, err := service.Store.CreateNotification(ctx, request)
	if err != nil {
		return false, err
	}
	log.Println("Optimize task saved successfully: ", savedTask)

	var notiMessage []byte
	notiMessage = append(notiMessage, []byte("Optimize task saved successfully")...)
	services.SendToUser(userId, notiMessage)

	return true, nil
}