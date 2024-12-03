package store

import (
	"context"
	request_dtos "notify_agent/core/domain/dtos/request"
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

func (store *NotificationStore) CreateNotification(context context.Context, request request_dtos.InsertNotificationRequestDTO) (interface{}, error) {
	collection := store.Database.Collection(store.Collection)
	db := store.Database

	notification := request_dtos.NewInsertNotificationRequestDTO().MapToEntity(request)
	result, err := store_adapter.INotificationRepository(
		&repository.NotificationRepository{Database: db, Collection: collection},
	).CreateNotification(context, notification) 
	if err != nil {
		return nil, err
	}
	return result, nil
}
