package store

import (
	"context"
	request_dtos "middleware_loader/core/domain/dtos/request"
	result_dto "middleware_loader/core/domain/dtos/result"
	"middleware_loader/core/domain/enums"
	port "middleware_loader/core/port/repository_interface"
	"middleware_loader/infrastructure/repository"
	database_mongo "middleware_loader/kernel/database/mongo"
)

type MicroserviceConfigurationStore struct {
	Database   database_mongo.Database
	Collection string
}

func NewMicroserviceConfigurationStore(db database_mongo.Database) MicroserviceConfigurationStore {
	return MicroserviceConfigurationStore{db, enums.MicroserviceConfiguration}
}

func (store *MicroserviceConfigurationStore) GetMicroserviceByName(context context.Context,
	microserviceRequest request_dtos.GetMicroserviceConfigurationDTO) (result_dto.MicroserviceResultDTO, error) {

	collection := store.Database.Collection(store.Collection)
	db := store.Database

	microservice, err := port.IMicroserviceConfigurationRepository(
		&repository.MicroserviceConfigurationRepository{Database: db, Collection: collection},
	).GetMicroserviceByName(context, microserviceRequest)
	if err != nil {
		return result_dto.MicroserviceResultDTO{}, err
	}

	var result result_dto.MicroserviceResultDTO
	result.MicroserviceName = microservice.MicroserviceName
	result.Status = microservice.Status
	return result, nil
}

func (store *MicroserviceConfigurationStore) GetAllMicroservices(context context.Context) ([]result_dto.MicroserviceResultDTO, error) {
	collection := store.Database.Collection(store.Collection)
	db := store.Database
	microservices, err := port.IMicroserviceConfigurationRepository(
		&repository.MicroserviceConfigurationRepository{Database: db, Collection: collection},
	).GetAllMicroservices(context)
	if err != nil {
		return nil, err
	}

	var results []result_dto.MicroserviceResultDTO
	for _, microservice := range microservices {
		var result result_dto.MicroserviceResultDTO
		result.ID = microservice.ID
		result.MicroserviceName = microservice.MicroserviceName
		result.Status = microservice.Status
		result.Port = microservice.Port
		result.CreatedAt = microservice.CreatedAt
		results = append(results, result)
	}
	return results, nil
}

func (store *MicroserviceConfigurationStore) GetMicroservice(context context.Context,
	microserviceRequest request_dtos.MicroserviceConfigurationDTO) error {
	collection := store.Database.Collection(store.Collection)
	db := store.Database
	_, err := port.IMicroserviceConfigurationRepository(
		&repository.MicroserviceConfigurationRepository{Database: db, Collection: collection},
	).GetMicroservice(context, microserviceRequest)
	if err != nil {
		return nil
	}
	return err
}

func (store *MicroserviceConfigurationStore) InsertMicroservice(context context.Context,
	microservice request_dtos.InsertMicroserviceConfigurationDTO) (interface{}, error) {
	collection := store.Database.Collection(store.Collection)
	result, err := port.IMicroserviceConfigurationRepository(
		&repository.MicroserviceConfigurationRepository{
			Database:   store.Database,
			Collection: collection,
		},
	).InsertMicroservice(context, microservice)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (store *MicroserviceConfigurationStore) UpdateMicroservice(context context.Context,
	microserviceRequest request_dtos.UpdateMicroserviceConfigurationDTO) (interface{}, error) {
	collection := store.Database.Collection(store.Collection)
	db := store.Database
	result, err := port.IMicroserviceConfigurationRepository(
		&repository.MicroserviceConfigurationRepository{Database: db, Collection: collection},
	).UpdateMicroservice(context, microserviceRequest)
	if err != nil {
		return nil, err
	}
	return result, nil
}
