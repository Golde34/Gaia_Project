package repository

import (
	"context"
	"log"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/entity"
	database_mongo "middleware_loader/kernel/database/mongo"
)

type MicroserviceStatusRepository struct {
	Database   database_mongo.Database
	Collection database_mongo.Collection
}

func NewMicroserviceStatusRepository(db database_mongo.Database, collection database_mongo.Collection) MicroserviceStatusRepository {
	return MicroserviceStatusRepository{db, collection}
}

func (repo *MicroserviceStatusRepository) GetMicroserviceStatus(context context.Context,
	microserviceStatus request_dtos.MicroserviceStatusDTO) (interface{}, error) {
	log.Printf("Connect to database")
	result, err := repo.Collection.InsertOne(context, microserviceStatus)
	return result, err
}

func (repo *MicroserviceStatusRepository) InsertMicroservice(context context.Context,
	microserviceStatus entity.MicroserviceStatus) (interface{}, error) {
	log.Printf("Connect to database - Create microservice function")
	result, err := repo.Collection.InsertOne(context, microserviceStatus)
	return result, err
}
