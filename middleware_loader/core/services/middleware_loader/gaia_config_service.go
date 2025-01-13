package services

import (
	"context"
	base_dtos "middleware_loader/core/domain/dtos/base"
	"middleware_loader/core/port/store"
	"middleware_loader/kernel/utils"
	"time"
)

type GaiaConfigurationService struct {
	Store store.GaiaConfigurationStore
}

func NewGaiaConfigurationService(store store.GaiaConfigurationStore) *GaiaConfigurationService {
	return &GaiaConfigurationService{store}
}

func (s *GaiaConfigurationService) GetAllGaiaConfiguration(paramType string) (base_dtos.ErrorResponse, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	gaiaConfigurations, err := s.Store.GetAllGaiaConfiguration(ctx, paramType)
	if err != nil {
		return utils.ReturnErrorResponse(400, "Cannot get all gaia configuration"), err
	}

	data := map[string]interface{}{
		"gaiaConfigurations": gaiaConfigurations,
	}
	response := utils.ReturnSuccessResponse("Get all gaia configuration success", data)

	return response, nil
}