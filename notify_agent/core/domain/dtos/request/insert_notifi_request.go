package request_dtos

type InsertNotificationRequestDTO struct {
	MessageID string `json:"message_id"`
	Type      string `json:"type"`
	Content   string `json:"content"`
	Status    string `json:"status"`
	IsRead    bool   `json:"is_read"`
	UserId    string `json:"user_id"`
}

func NewInsertNotificationRequestDTO() *InsertNotificationRequestDTO {
	return &InsertNotificationRequestDTO{}
}

func (r *InsertNotificationRequestDTO) InsertOptimizeTaskRequestMapper() map[string]interface{} {
	return map[string]interface{}{
		"message_id": r.MessageID,
		"type":       r.Type,
		"content":    r.Content,
		"status":     r.Status,
		"is_read":    r.IsRead,
		"user_id":    r.UserId,
	}
}
