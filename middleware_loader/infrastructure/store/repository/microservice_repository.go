package repository

import (
	"context"
	"log"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/entity"
	database_mongo "middleware_loader/kernel/database/mongo"

	"go.mongodb.org/mongo-driver/bson"
)

type MicroserviceConfigurationRepository struct {
	Database   database_mongo.Database
	Collection database_mongo.Collection
}

func NewMicroserviceConfigurationRepository(db database_mongo.Database, collection database_mongo.Collection) MicroserviceConfigurationRepository {
	return MicroserviceConfigurationRepository{db, collection}
}

func (repo *MicroserviceConfigurationRepository) GetAllMicroservices(context context.Context) ([]entity.MicroserviceConfiguration, error) {
	log.Printf("Connect to database")
	cursor, err := repo.Collection.Find(context, bson.M{})
	if err != nil {
		return nil, err
	}
	var microservices []entity.MicroserviceConfiguration
	if err = cursor.All(context, &microservices); err != nil {
		return nil, err
	}

	return microservices, nil
}

func (repo *MicroserviceConfigurationRepository) GetMicroserviceByName(context context.Context,
	microserviceRequest request_dtos.GetMicroserviceConfigurationDTO) (entity.MicroserviceConfiguration, error) {
	filter := bson.M{"microservicename": microserviceRequest.MicroserviceName}
	result := repo.Collection.FindOne(context, filter)
	microservice := entity.MicroserviceConfiguration{}
	err := result.Decode(&microservice)
	if err != nil {
		return entity.MicroserviceConfiguration{}, err
	}
	
	return microservice, nil
}

func (repo *MicroserviceConfigurationRepository) GetMicroservice(context context.Context,
	microserviceRequest request_dtos.MicroserviceConfigurationDTO) (interface{}, error) {
	log.Printf("Connect to database")
	result, err := repo.Collection.InsertOne(context, microserviceRequest)
	return result, err
}

func (repo *MicroserviceConfigurationRepository) InsertMicroservice(context context.Context,
	microserviceRequest request_dtos.InsertMicroserviceConfigurationDTO) (interface{}, error) {
	result, err := repo.Collection.InsertOne(context, microserviceRequest)
	return result, err
}

func (repo *MicroserviceConfigurationRepository) UpdateMicroservice(context context.Context,
	microserviceRequest request_dtos.UpdateMicroserviceConfigurationDTO) (interface{}, error) {
	log.Printf("Connect to database - Update microservice function")

	microservice := repo.Collection.FindOne(context, microserviceRequest.MicroserviceName)
	if microservice == nil {
		return nil, nil
	}
	result, err := repo.Collection.UpdateOne(context, microserviceRequest, microservice)
	return result, err
}
