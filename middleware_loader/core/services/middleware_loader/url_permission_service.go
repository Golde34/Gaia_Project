package services

import (
	"context"
	base_dtos "middleware_loader/core/domain/dtos/base"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/port/store"
	"middleware_loader/core/services/base"
	"time"
)

type URLPermissionService struct {
	Store store.UrlPermissionConfigurationStore
}

func NewUrlPermissionService(store store.UrlPermissionConfigurationStore) *URLPermissionService {
	return &URLPermissionService{store}
}

func (s *URLPermissionService) GetURLPermission(input request_dtos.UrlPermissionDTO) base_dtos.ErrorResponse {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result := s.Store.GetUrlPermission(ctx, input)
	if result == nil {
		return base.ReturnErrorResponse(400, "Cannot get url permission from database")
	}
	return base.ReturnSuccessResponse("OK", result)
}
