package services

import (
	"context"
	"log"
	request_dtos "notify_agent/core/domain/dtos/request"
	"notify_agent/core/domain/entity"
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

func (service *OptimizeTaskNotifyService) OptimizeTaskNoti(messageId, userId, optimizedStatus, errorStatus, notificationFlowId string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	log.Println("InitOptimizeTask ", ctx)

	var notification entity.Notification
	if errorStatus == "INIT" {
		request := mapper.InsertOptimizeTaskRequestMapper(messageId, userId, optimizedStatus, errorStatus, notificationFlowId)
		notification = request_dtos.NewInsertNotificationRequestDTO().MapToEntity(request)
	} else {
		validation := service.validateUpdateOptimizeTaskNoti(ctx, messageId, userId, optimizedStatus, errorStatus, notificationFlowId)
		if !validation {
			return false, nil
		}
		request := mapper.UpdateOptimizeTaskRequestMapper(messageId, optimizedStatus, errorStatus)
		notification = request_dtos.NewInsertNotificationRequestDTO().MapToEntity(request)
	}
	savedTask, err := service.Store.CreateNotification(ctx, notification)
	if err != nil {
		return false, err
	}
	log.Println("Optimize task saved successfully: ", savedTask)

	var notiMessage []byte
	notiMessage = append(notiMessage, []byte("Optimize task saved successfully")...)
	services.SendToUser(userId, notiMessage)

	return true, nil
}

func (service *OptimizeTaskNotifyService) validateUpdateOptimizeTaskNoti(ctx context.Context,
	messageId, userId, optimizedStatus, errorStatus, notificationFlowId string) bool {
	if messageId == "" || userId == "" || optimizedStatus == "" || errorStatus == "" || notificationFlowId == "" {
		log.Println("Error mapping optimize task request")
		return false
	}

	savedNoti, err := service.Store.GetNotificationByNotificationFLowId(ctx, notificationFlowId)
	if err != nil {
		log.Println("Error getting optimize task")
		return false
	}

	if savedNoti == nil {
		log.Println("Optimize task not found")
		return false
	}

	if savedNoti.(entity.Notification).NotificationFlowId != notificationFlowId {
		log.Println("Optimize task not found because of wrong notification flow id")
		return false
	}

	if savedNoti.(entity.Notification).Status != "INIT" {
		log.Println("Optimize task already processed")
		return false
	}

	if savedNoti.(entity.Notification).UserId != userId {
		log.Println("Optimize task not found because of wrong user id")
		return false
	}

	return true
}
