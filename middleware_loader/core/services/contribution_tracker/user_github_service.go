package services

import (
	"middleware_loader/core/port/client"
	adapter "middleware_loader/infrastructure/client"
)

type UserGithubService struct {}

func NewUserGithubService() *UserGithubService {
	return &UserGithubService{}
}

func (s *UserGithubService) GetUserGithubInfo(userId string) (string, error) {
	userGithubInfo, err := client.IUserGithubAdapter(&adapter.UserGithubAdapter{}).GetUserGithubInfo(userId)
	if err != nil {
		return "", err
	}
	return userGithubInfo, nil
}