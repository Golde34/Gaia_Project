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
