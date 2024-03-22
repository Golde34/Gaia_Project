package services

import (
	"context"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/models"
	"middleware_loader/core/services/base"
	"middleware_loader/core/store"
	"time"
)

type URLPermissionService struct {
	Store store.UrlPermissionConfigurationStore
}

func NewUrlPermissionService(store store.UrlPermissionConfigurationStore) *URLPermissionService {
	return &URLPermissionService{store}
}

func (s *URLPermissionService) GetURLPermission(input request_dtos.UrlPermissionDTO) models.ErrorResponse {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result := s.Store.GetUrlPermission(ctx, input)
	if result == nil {
		return base.ReturnErrorResponse(400, "Cannot get url permission from database")
	}
	return base.ReturnSuccessResponse("OK", result)
}
