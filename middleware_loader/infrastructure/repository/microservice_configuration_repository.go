package repository

import (
	"context"
	"log"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/entity"
	database_mongo "middleware_loader/kernel/database/mongo"
)

type MicroserviceConfigurationRepository struct {
	Database   database_mongo.Database
	Collection database_mongo.Collection
}

func NewMicroserviceConfigurationRepository(db database_mongo.Database, collection database_mongo.Collection) MicroserviceConfigurationRepository {
	return MicroserviceConfigurationRepository{db, collection}
}

func (repo *MicroserviceConfigurationRepository) GetMicroservice(context context.Context,
	microserviceRequest request_dtos.MicroserviceConfigurationDTO) (interface{}, error) {
	log.Printf("Connect to database")
	result, err := repo.Collection.InsertOne(context, microserviceRequest)
	return result, err
}

func (repo *MicroserviceConfigurationRepository) InsertMicroservice(context context.Context,
	microserviceRequest entity.MicroserviceConfiguration) (interface{}, error) {
	log.Printf("Connect to database - Create microservice function")
	result, err := repo.Collection.InsertOne(context, microserviceRequest)
	return result, err
}
