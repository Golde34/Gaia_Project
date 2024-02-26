package repository

import (
	"context"
	request_dtos "middleware_loader/core/domain/dtos/request"
	database_mongo "middleware_loader/kernel/database/mongo"
)

// MicroserviceStatusRepository ...
type MicroserviceStatusRepository struct {
	Database   database_mongo.Database
	Collection string
}

// NewMicroserviceStatusRepository ...
func NewMicroserviceStatusRepository(db database_mongo.Database, collection string) MicroserviceStatusRepository {
	return MicroserviceStatusRepository{db, collection}
}

func (repo *MicroserviceStatusRepository) GetMicroservice(context context.Context,
	microserviceStatus request_dtos.MicroserviceStatusDTO) error {
	collection := repo.Database.Collection(repo.Collection)
	_, err := collection.InsertOne(context, microserviceStatus)
	return err
}
