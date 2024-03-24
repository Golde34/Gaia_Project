package adapter_interface

import response_dtos "middleware_loader/core/domain/dtos/response"

type IUserAdapter interface {
	ListAllUsers() ([]response_dtos.UserDTO, error)
}