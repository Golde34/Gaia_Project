package store

import (
	"context"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/enums"
	store_adapter "middleware_loader/infrastructure/store/adapter"
	"middleware_loader/infrastructure/store/repository"
	database_mongo "middleware_loader/kernel/database/mongo"
)

type UrlPermissionConfigurationStore struct {
	Database    database_mongo.Database
	Collection string
}

func NewUrlPermissionConfigurationStore(db database_mongo.Database) UrlPermissionConfigurationStore {
	return UrlPermissionConfigurationStore{db, enums.UrlPermissionConfiguration}
}

func (store *UrlPermissionConfigurationStore) GetUrlPermission(context context.Context, url request_dtos.UrlPermissionDTO) database_mongo.SingleResult {
	collection := store.Database.Collection(store.Collection)
	result := store_adapter.IUrlPermissionConfigurationRepository(
		&repository.UrlPermissionConfigurationRepository{
			Database:   store.Database,
			Collection: collection,
		},
	).GetUrlPermission(context, url)
	return result
}
