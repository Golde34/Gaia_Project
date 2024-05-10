package client

import (
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/graph/model"
)

type IRoleAdapter interface {
	GetAllRoles() ([]response_dtos.RoleDTO, error)
	CreateRole(input model.RoleInput) (response_dtos.RoleDTO, error)
}