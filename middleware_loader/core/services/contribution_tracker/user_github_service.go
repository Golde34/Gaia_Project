package services

import (
	"context"
	base_dtos "middleware_loader/core/domain/dtos/base"
	"middleware_loader/core/port/client"
	"middleware_loader/core/port/store"
	adapter "middleware_loader/infrastructure/client"
	"middleware_loader/kernel/utils"
	"time"
)

type UserGithubService struct {
	Store store.GaiaConfigurationStore
}

func NewUserGithubService(store store.GaiaConfigurationStore) *UserGithubService {
	return &UserGithubService{store}
}

func (s *UserGithubService) GetUserGithubInfo(userId string) (base_dtos.ErrorResponse, error) {
	userGithubInfo, err := client.IUserGithubAdapter(&adapter.UserGithubAdapter{}).GetUserGithubInfo(userId)
	if err != nil {
		return utils.ReturnErrorResponse(400, "Cannot get user github info from Contribution Tracker"), err 
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	gaiaConfigurations, err := s.Store.GetAllGaiaConfiguration(ctx, "github_config")
	if err != nil {
		return utils.ReturnErrorResponse(400, "Cannot get all gaia configuration"), err
	}

	data := map[string]interface{}{
		"userGithubInfo": userGithubInfo,
		"gaiaConfigurations": gaiaConfigurations,
	}

	response := utils.ReturnSuccessResponse("Get user github info success", data)
	return response, nil
}