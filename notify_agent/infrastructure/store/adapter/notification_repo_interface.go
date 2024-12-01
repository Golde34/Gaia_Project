package store_adapter

import (
	"context"
	request_dtos "notify_agent/core/domain/dtos/request"
)

type INotificationRepository interface {
	CreateNotification(context context.Context, notification request_dtos.InsertNotificationRequestDTO) (interface{}, error)
}