package repository

import (
	"context"
	"notify_agent/core/domain/entity"
	database_mongo "notify_agent/kernel/database/mongo"
)

type NotificationRepository struct {
	Database   database_mongo.Database
	Collection database_mongo.Collection
}

func NewNotificationRepository(db database_mongo.Database, collection database_mongo.Collection) NotificationRepository {
	return NotificationRepository{
		Database:   db,
		Collection: collection,
	}
}

func (repo *NotificationRepository) CreateNotification(context context.Context, notification entity.Notification) (interface{}, error) {
	result, err := repo.Collection.InsertOne(context, notification)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (repo *NotificationRepository) GetNotificationByNotificationFLowId(context context.Context, notificationStringId string) (interface{}, error) {
	result, err := repo.Collection.Find(context, map[string]string{"notificationflowid": notificationStringId})
	if err != nil {
		return nil, err
	}

	return result, nil
}