package repository

import (
	"context"
	request_dtos "notify_agent/core/domain/dtos/request"
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

func (repo *NotificationRepository) CreateNotification(context context.Context, notification request_dtos.InsertNotificationRequestDTO) (interface{}, error) {
	result, err := repo.Collection.InsertOne(context, notification)
	if err != nil {
		return nil, err
	}

	return result, nil
}
