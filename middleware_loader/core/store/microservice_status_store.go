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

type MicroserviceStatusStore struct {
	Database   database_mongo.Database
	Collection string
}

func NewMicroserviceStatusStore(db database_mongo.Database) MicroserviceStatusStore {
	return MicroserviceStatusStore{db, enums.MicroserviceStatus}
}

func (store *MicroserviceStatusStore) GetMicroservice(context context.Context,
	microserviceStatus request_dtos.MicroserviceStatusDTO) error {
	collection := store.Database.Collection(store.Collection)
	db := store.Database
	_, err := port.IMicroserviceStatusRepository(
		&repository.MicroserviceStatusRepository{Database: db, Collection: collection},
	).GetMicroserviceStatus(context, microserviceStatus)
	if err != nil {
		return nil
	}
	return err
}

func (store *MicroserviceStatusStore) InsertMicroservice(context context.Context,
	microserviceStatus entity.MicroserviceStatus) (interface{}, error) {
	return nil, nil
}
