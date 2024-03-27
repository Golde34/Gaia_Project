package client

import (
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/graph/model"
)

type IUserAdapter interface {
	ListAllUsers() ([]response_dtos.UserDTO, error)
	UpdateUser(user model.UpdateUserInput) (response_dtos.UserDTO, error)
}
