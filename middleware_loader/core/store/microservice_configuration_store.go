package store

import (
	"context"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/entity"
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
	microservice entity.MicroserviceConfiguration) (interface{}, error) {
	collection := store.Database.Collection(store.Collection)
	result, err := port.IMicroserviceConfigurationRepository(
		&repository.MicroserviceConfigurationRepository{
			Database: store.Database,
			Collection: collection,
		},
	).InsertMicroservice(context, microservice)
	if err != nil {
		return nil, err
	}
	return result, nil
}
