package services

import (
	"context"
	"encoding/json"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/entity"
	"middleware_loader/core/domain/enums"
	"middleware_loader/core/domain/models"
	"middleware_loader/core/services/base"
	"middleware_loader/core/store"
	adapter_base "middleware_loader/infrastructure/adapter/base"
	"time"
)

type MicroserviceConfigurationService struct {
	Store store.MicroserviceConfigurationStore
}

func NewMicroserviceConfigurationService(store store.MicroserviceConfigurationStore) *MicroserviceConfigurationService {
	return &MicroserviceConfigurationService{store}
}

func (s *MicroserviceConfigurationService) GetMicroserviceByName(input request_dtos.GetMicroserviceConfigurationDTO) (interface{}, error) {
	ctx := base.DeferTimeout()

	microservice, err := s.Store.GetMicroserviceByName(ctx, input)
	if err != nil {
		return entity.MicroserviceConfiguration{}, err
	}

	return microservice, nil
}

func (s *MicroserviceConfigurationService) CallMicroservice(input request_dtos.GetMicroserviceConfigurationDTO) (models.ErrorResponse, error) {
	microserviceUrl := getMicroserviceUrlByName(input.MicroserviceName)
	microserviceUrl = microserviceUrl + "/status"

	bodyResult, err := adapter_base.BaseAPI(microserviceUrl, "GET", nil)
	if err != nil {
		return models.ErrorResponse{}, err
	}

	dataBytes, err := adapter_base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return models.ErrorResponse{}, err
	}

	var microserviceStatus models.ErrorResponse
	err = json.Unmarshal(dataBytes, &microserviceStatus)
	if err != nil {
		return models.ErrorResponse{}, err
	}

	s.InsertMicroservice(request_dtos.MicroserviceConfigurationDTO{
		MicroserviceName: input.MicroserviceName,
		Status: "ACTIVE",
	})
	return microserviceStatus, nil

}

func getMicroserviceUrlByName(microserviceName string) string {
	switch microserviceName {
	case enums.AUTH_SERVICE:
		return adapter_base.AuthServiceURL
	case enums.GAIA_SERVICE:
		return adapter_base.GaiaServiceURL
	case enums.TASK_MANAGER:
		return adapter_base.TaskManagerServiceURL
	default:
		return ""
	}
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

func (s *MicroserviceConfigurationService) UpdateMicroservice(input request_dtos.MicroserviceConfigurationDTO) models.ErrorResponse {
	ctx := base.DeferTimeout()

	var microserviceEntity entity.MicroserviceConfiguration
	microserviceEntity.UpdatedAt = time.Now()
	microserviceEntity.MicroserviceName = input.MicroserviceName
	microserviceEntity.Status = input.Status

	microservice, err := s.Store.UpdateMicroservice(ctx, microserviceEntity)
	if err != nil {
		return base.ReturnErrorResponse(400, "Cannot update miccroservice configuration")
	}

	return base.ReturnSuccessResponse("Update successfully", microservice)
}