package repository

import (
	"context"
	"log"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/entity"
	database_mongo "middleware_loader/kernel/database/mongo"
)

// MicroserviceStatusRepository ...
type MicroserviceStatusRepository struct {
	Database           database_mongo.Database
	Collection         string
}

// NewMicroserviceStatusRepository ...
func NewMicroserviceStatusRepository(db database_mongo.Database, collection string) MicroserviceStatusRepository {
	return MicroserviceStatusRepository{db, collection}
}

func (repo *MicroserviceStatusRepository) GetMicroservice(context context.Context,
	microserviceStatus request_dtos.MicroserviceStatusDTO) error {
	log.Printf("Connect to database")
	collection := repo.Database.Collection(repo.Collection)
	_, err := collection.InsertOne(context, microserviceStatus)
	return err
}

func (repo *MicroserviceStatusRepository) InsertMicroservice(context context.Context,
	microserviceStatus entity.MicroserviceStatus) (interface{}, error) {
	log.Printf("Connect to database - Create microservice function")
	collection := repo.Database.Collection(repo.Collection)
	result, err := collection.InsertOne(context, microserviceStatus)
	return result, err
}
