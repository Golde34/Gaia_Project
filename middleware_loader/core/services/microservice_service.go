package services

import (
	"context"
	request_dtos "middleware_loader/core/domain/dtos/request"
	result_dto "middleware_loader/core/domain/dtos/result"
	"middleware_loader/core/domain/models"
	port "middleware_loader/core/port/adapter_interface"
	"middleware_loader/core/services/base"
	"middleware_loader/core/store"
	"middleware_loader/infrastructure/adapter"
	"time"
)

type MicroserviceConfigurationService struct {
	Store store.MicroserviceConfigurationStore
}

func NewMicroserviceConfigurationService(store store.MicroserviceConfigurationStore) *MicroserviceConfigurationService {
	return &MicroserviceConfigurationService{store}
}

func (s *MicroserviceConfigurationService) CheckMicroserviceStatus(input request_dtos.GetMicroserviceConfigurationDTO) (models.ErrorResponse, error) {
	microservice, err := s.getMicroserviceByName(input)
	if err != nil {
		result, err := s.callMicroservice(input)
		if err != nil {
			return models.ErrorResponse{}, err
		} else {
			s.InsertMicroservice(request_dtos.InsertMicroserviceConfigurationDTO{
				MicroserviceName: result.MicroserviceName,
				Status:           result.Status,
				Port:             result.Port,
				CreatedAt:        time.Now(),
			})
			return base.ReturnSuccessResponse("Microservice is active", result), nil
		}
	}
	if !microservice.Status {
		result, err := s.callMicroservice(input)
		if err != nil {
			return models.ErrorResponse{}, err
		} else {
			s.UpdateMicroservice(request_dtos.UpdateMicroserviceConfigurationDTO{
				MicroserviceName: result.MicroserviceName,
				Status:           result.Status,
				UpdatedAt:        time.Now(),
			})
			return base.ReturnSuccessResponse("Microservice is active", result), nil
		}
	}
	return base.ReturnSuccessResponse("Microservice is active", microservice), nil
}

func (s *MicroserviceConfigurationService) getMicroserviceByName(input request_dtos.GetMicroserviceConfigurationDTO) (result_dto.MicroserviceResultDTO, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	microservice, err := s.Store.GetMicroserviceByName(ctx, input)
	if err != nil {
		return result_dto.MicroserviceResultDTO{}, err
	}

	return microservice, nil
}

func (s *MicroserviceConfigurationService) callMicroservice(input request_dtos.GetMicroserviceConfigurationDTO) (result_dto.MicroserviceResultDTO, error) {
	microservice, err := port.IMicroserviceAdapter(&adapter.MicroserviceAdapter{}).GetMicroserviceByName(input.MicroserviceName)
	if err != nil {
		return result_dto.MicroserviceResultDTO{}, err
	}

	var microserviceResult result_dto.MicroserviceResultDTO
	if microservice.ErrorCode == 200 {
		microserviceResult.Status = true
		microserviceResult.MicroserviceName = input.MicroserviceName
		microserviceResult.Port = microservice.Data.(string)
	} else {
		microserviceResult.Status = false
		microserviceResult.MicroserviceName = input.MicroserviceName
	}

	return microserviceResult, nil
}

func (s *MicroserviceConfigurationService) GetAllMicroservices() ([]result_dto.MicroserviceResultDTO, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	microservices, err := s.Store.GetAllMicroservices(ctx)
	if err != nil {
		return nil, err
	}

	return microservices, nil
}

func (s *MicroserviceConfigurationService) GetMicroservice(input request_dtos.MicroserviceConfigurationDTO) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	return s.Store.GetMicroservice(ctx, input)
}

func (s *MicroserviceConfigurationService) InsertMicroservice(input request_dtos.InsertMicroserviceConfigurationDTO) models.ErrorResponse {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	getMicroservicce, err := s.Store.GetMicroserviceByName(ctx, request_dtos.GetMicroserviceConfigurationDTO{
		MicroserviceName: input.MicroserviceName,
	})

	// If exist microservice
	if err == nil {
		if getMicroservicce.MicroserviceName != "" {
			return base.ReturnErrorResponse(400, "Microservice already exist")
		}
	} else {
		// If not exist microservice
		microservice, err := s.Store.InsertMicroservice(ctx, input)
		if err != nil {
			return base.ReturnErrorResponse(400, "Cannot insert miccroservice configuration")
		}
		return base.ReturnSuccessResponse("Insert successfully", microservice)
	}
	return base.ReturnErrorResponse(400, "Microservice already exist")
}

func (s *MicroserviceConfigurationService) UpdateMicroservice(input request_dtos.UpdateMicroserviceConfigurationDTO) models.ErrorResponse {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	microservice, err := s.Store.UpdateMicroservice(ctx, input)
	if err != nil {
		return base.ReturnErrorResponse(400, "Cannot update miccroservice configuration")
	}

	return base.ReturnSuccessResponse("Update successfully", microservice)
}
