package store_adapter

import (
	"context"
	"notify_agent/core/domain/entity"
)

type INotificationRepository interface {
	CreateNotification(context context.Context, notification entity.Notification) (interface{}, error)
	GetNotificationByNotificationFLowId(context context.Context, notificationStringId string) (interface{}, error)
}