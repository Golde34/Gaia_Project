package services

import (
	"context"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/entity"
	"middleware_loader/core/domain/models"
	"middleware_loader/core/services/base"
	"middleware_loader/infrastructure/repository"
	"time"
)

type MicroserviceStatusService struct {
	Repository repository.MicroserviceStatusRepository
}

func NewMicroserviceStatusService(repo repository.MicroserviceStatusRepository) *MicroserviceStatusService {
	return &MicroserviceStatusService{repo}
}

func (s *MicroserviceStatusService) GetMicroserviceStatus(input request_dtos.MicroserviceStatusDTO) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	return s.Repository.GetMicroservice(ctx, input)
}

func (s *MicroserviceStatusService) InsertMicroservice(input request_dtos.MicroserviceStatusDTO) (interface{}, error) {
	ctx := base.DeferTimeout()
	var microserviceEntity entity.MicroserviceStatus
	microserviceEntity.CreatedAt = time.Now()
	microserviceEntity.MicroserviceName = input.MicroserviceName
	microserviceEntity.Status = input.Status	
	
	result, err := s.Repository.InsertMicroservice(ctx, microserviceEntity)
	if err != nil {
		return models.ErrorResponse {
			Status: "Error",
			StatusMessage: "Internal Server Error",
			ErrorCode: 500,
			ErrorMessage: "Cannot add to DB",
		}, nil
	}
	return models.ErrorResponse {
		Status: "Success",
		StatusMessage: "Success",
		ErrorCode: 200,
		ErrorMessage: "Add DB Success",
		Data: result,
	}, nil
}