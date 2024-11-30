package store

import (
	"notify_agent/core/domain/enums"
	database_mongo "notify_agent/kernel/database/mongo"
)

type NotificationStore struct {
	Database database_mongo.Database
	Collection string
}

func NewNotificationStore(db database_mongo.Database) *NotificationStore {
	return &NotificationStore{
		Database: db,
		Collection: enums.Notification,
	}
}