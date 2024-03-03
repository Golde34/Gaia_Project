package repository

import (
	"context"
	request_dtos "middleware_loader/core/domain/dtos/request"
	database_mongo "middleware_loader/kernel/database/mongo"
)

type UrlPermissionConfigurationRepository struct {
	Database   database_mongo.Database
	Collection database_mongo.Collection
}

func NewUrlPermissionConfigurationRepository(db database_mongo.Database, collection database_mongo.Collection) UrlPermissionConfigurationRepository {
	return UrlPermissionConfigurationRepository{db, collection}
}

func (repo *UrlPermissionConfigurationRepository) GetUrlPermission(
	context context.Context, urlPermission request_dtos.UrlPermissionDTO) (database_mongo.SingleResult) {
	result := repo.Collection.FindOne(context, urlPermission)
	return result
}
