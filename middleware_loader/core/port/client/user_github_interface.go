package client

import response_dtos "middleware_loader/core/domain/dtos/response"

type IUserGithubAdapter interface {
	GetUserGithubInfo(userId string) (response_dtos.UserGithubDTO, error)
}