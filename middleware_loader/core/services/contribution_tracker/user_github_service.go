package services

import (
	base_dtos "middleware_loader/core/domain/dtos/base"
	"middleware_loader/core/port/client"
	adapter "middleware_loader/infrastructure/client"
	"middleware_loader/kernel/utils"
)

type UserGithubService struct {}

func NewUserGithubService() *UserGithubService {
	return &UserGithubService{}
}

func (s *UserGithubService) GetUserGithubInfo(userId string) (base_dtos.ErrorResponse, error) {
	userGithubInfo, err := client.IUserGithubAdapter(&adapter.UserGithubAdapter{}).GetUserGithubInfo(userId)
	if err != nil {
		return utils.ReturnErrorResponse(400, "Cannot get user github info from Contribution Tracker"), err 
	}

	response := utils.ReturnSuccessResponse("Get user github info success", userGithubInfo)
	return response, nil
}