package request_dtos

import "notify_agent/core/domain/entity"

type InsertNotificationRequestDTO struct {
	MessageID          string `json:"message_id"`
	Type               string `json:"type"`
	Content            string `json:"content"`
	Status             string `json:"status"`
	IsRead             bool   `json:"is_read"`
	UserId             string `json:"user_id"`
	NotificationFlowId string `json:"notification_flow_id"`
}

func NewInsertNotificationRequestDTO() *InsertNotificationRequestDTO {
	return &InsertNotificationRequestDTO{}
}

func (r *InsertNotificationRequestDTO) MapToEntity(request InsertNotificationRequestDTO) entity.Notification {
	return entity.Notification{
		MessageID:          r.MessageID,
		Type:               r.Type,
		Content:            r.Content,
		Status:             r.Status,
		IsRead:             r.IsRead,
		UserId:             r.UserId,
		NotificationFlowId: r.NotificationFlowId,
	}
}
