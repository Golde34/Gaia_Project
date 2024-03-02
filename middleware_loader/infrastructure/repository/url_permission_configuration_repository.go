package repository

import (
	"context"
	"middleware_loader/core/domain/entity"
	database_mongo "middleware_loader/kernel/database/mongo"
)

type UrlPermissionConfigurationRepository struct {
	Database   database_mongo.Database
	Collection database_mongo.Collection
}

func NewUrlPermissionConfigurationRepository(db database_mongo.Database, collection database_mongo.Collection) UrlPermissionConfigurationRepository {
	return MicroserviceConfigurationRepository{db, collection}
}

func (repo *UrlPermissionConfigurationRepository) GetUrlPermission(
	context context.Context, urlPermission entity.UrlPermission) (database_mongo.SingleResult) {
	result := repo.Collection.FindOne(context, urlPermission)
	return result
}
