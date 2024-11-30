package entity

import "notify_agent/core/domain/enums"

const (
	CollectionNotification = enums.Notification
)

type Notification struct {
	ID         string `json:"id" bson:"_id"`
	MessageID  string `json:"message_id" bson:"message_id"`
	Type       string `json:"type" bson:"type"`
	Content    string `json:"content" bson:"content"`
	ReceiverID string `json:"receiver_id" bson:"receiver_id"`
	IsRead     bool   `json:"is_read" bson:"is_read"`
	Status     string `json:"status" bson:"status"`
	CreatedAt  int64  `json:"created_at" bson:"created_at"`
	UpdatedAt  int64  `json:"updated_at" bson:"updated_at"`
}

func NewNotification(id, messageID, notificationType, content, receiverID, status string, isRead bool, createdAt, updatedAt int64) *Notification {
	return &Notification{
		ID:         id,
		MessageID:  messageID,
		Type:       notificationType,
		Content:    content,
		ReceiverID: receiverID,
		IsRead:     isRead,
		Status:     status,
		CreatedAt:  createdAt,
		UpdatedAt:  updatedAt,
	}
}

func (n *Notification) SetID(id string) {
	n.ID = id
}

func (n *Notification) SetMessageID(messageID string) {
	n.MessageID = messageID
}

func (n *Notification) SetType(notificationType string) {
	n.Type = notificationType
}

func (n *Notification) SetContent(content string) {
	n.Content = content
}

func (n *Notification) SetReceiverID(receiverID string) {
	n.ReceiverID = receiverID
}

func (n *Notification) SetIsRead(isRead bool) {
	n.IsRead = isRead
}

func (n *Notification) SetStatus(status string) {
	n.Status = status
}

func (n *Notification) SetCreatedAt(createdAt int64) {
	n.CreatedAt = createdAt
}

func (n *Notification) SetUpdatedAt(updatedAt int64) {
	n.UpdatedAt = updatedAt
}

func (n *Notification) GetID() string {
	return n.ID
}

func (n *Notification) GetMessageID() string {
	return n.MessageID
}

func (n *Notification) GetType() string {
	return n.Type
}

func (n *Notification) GetContent() string {
	return n.Content
}

func (n *Notification) GetReceiverID() string {
	return n.ReceiverID
}

func (n *Notification) GetIsRead() bool {
	return n.IsRead
}

func (n *Notification) GetStatus() string {
	return n.Status
}

func (n *Notification) GetCreatedAt() int64 {
	return n.CreatedAt
}

func (n *Notification) GetUpdatedAt() int64 {
	return n.UpdatedAt
}
