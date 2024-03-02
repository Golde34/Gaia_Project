package services

import (
	"context"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/entity"
	"middleware_loader/core/domain/models"
	"middleware_loader/core/services/base"
	"middleware_loader/core/store"
	"time"
)

type MicroserviceConfigurationService struct {
	Store store.MicroserviceConfigurationStore
}

func NewMicroserviceConfigurationService(store store.MicroserviceConfigurationStore) *MicroserviceConfigurationService {
	return &MicroserviceConfigurationService{store}
}

func (s *MicroserviceConfigurationService) GetMicroservice(input request_dtos.MicroserviceConfigurationDTO) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	return s.Store.GetMicroservice(ctx, input)
}

func (s *MicroserviceConfigurationService) InsertMicroservice(input request_dtos.MicroserviceConfigurationDTO) models.ErrorResponse {
	ctx := base.DeferTimeout()

	var microserviceEntity entity.MicroserviceConfiguration
	microserviceEntity.CreatedAt = time.Now()
	microserviceEntity.MicroserviceName = input.MicroserviceName
	microserviceEntity.Status = input.Status

	microservice, err := s.Store.InsertMicroservice(ctx, microserviceEntity)
	if err != nil {
		return base.ReturnErrorResponse(400, "Cannot insert miccroservice configuration")
	}

	return base.ReturnSuccessResponse("Insert successfully", microservice)
}
