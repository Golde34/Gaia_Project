package client

import response_dtos "middleware_loader/core/domain/dtos/response"

type IRoleAdapter interface {
	GetAllRoles() ([]response_dtos.RoleDTO, error)
}