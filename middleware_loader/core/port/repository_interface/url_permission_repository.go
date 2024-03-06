package repository_interface

import (
	"context"
	request_dtos "middleware_loader/core/domain/dtos/request"
	database_mongo "middleware_loader/kernel/database/mongo"
)

type IUrlPermissionConfigurationRepository interface {
	GetUrlPermission(ctx context.Context, urlPermission request_dtos.UrlPermissionDTO) database_mongo.SingleResult
}