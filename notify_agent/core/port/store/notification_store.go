package store

import (
	"context"
	"notify_agent/core/domain/entity"
	"notify_agent/core/domain/enums"
	store_adapter "notify_agent/infrastructure/store/adapter"
	"notify_agent/infrastructure/store/repository"
	database_mongo "notify_agent/kernel/database/mongo"
)

type NotificationStore struct {
	Database   database_mongo.Database
	Collection string
}

func NewNotificationStore(db database_mongo.Database) *NotificationStore {
	return &NotificationStore{
		Database:   db,
		Collection: enums.Notification,
	}
}

func (store *NotificationStore) CreateNotification(context context.Context, notification entity.Notification) (interface{}, error) {
	collection := store.Database.Collection(store.Collection)
	db := store.Database

	result, err := store_adapter.INotificationRepository(
		&repository.NotificationRepository{Database: db, Collection: collection},
	).CreateNotification(context, notification) 
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (store *NotificationStore) GetNotificationByNotificationFLowId(context context.Context, notificationStringId string) (interface{}, error) {
	collection := store.Database.Collection(store.Collection)
	db := store.Database

	result, err := store_adapter.INotificationRepository(
		&repository.NotificationRepository{Database: db, Collection: collection},
	).GetNotificationByNotificationFLowId(context, notificationStringId)
	if err != nil {
		return nil, err
	}

	return result, nil
}