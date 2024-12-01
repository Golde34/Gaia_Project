package store

import (
	"context"
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

func (store *NotificationStore) CreateNotification(context context.Context, userId, optimizeStatus string) (interface{}, error) {
// 	collection := store.Database.Collection(store.Collection)
// 	result, err := store_adapter.INotificationRepository
	return nil, nil
}