package store

import (
	"context"
	"middleware_loader/core/domain/entity"
	"middleware_loader/core/domain/enums"
	"middleware_loader/infrastructure/repository"
	database_mongo "middleware_loader/kernel/database/mongo"
)

type UrlPermissionConfigurationStore struct {
	Database    database_mongo.Database
	Collection string
}

func NewUrlPermissionConfigurationRepository(db database_mongo.Database) UrlPermissionConfigurationStore {
	return UrlPermissionConfigurationStore{db, enums.UrlPermissionConfiguration}
}

func (store *UrlPermissionConfigurationStore) GetUrlPermission(context context.Context,
	urlPermission entity.UrlPermission) interface{} {
	collection := store.Database.Collection(store.Collection)
	result := port.IUrlPermissionConfigurationRepository(
		&repository.UrlPermissionConfigurationRepository{
			Database:   store.Database,
			Collection: collection,
		},
	).GetUrlPermission(context, urlPermission)
	return result
}
