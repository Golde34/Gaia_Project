package services

import (
	"context"
	request_dtos "middleware_loader/core/domain/dtos/request"
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