package services

import (
	"context"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/port/client"
	adapter "middleware_loader/infrastructure/client"
	"middleware_loader/infrastructure/graph/model"
)

type RoleService struct {
}

func NewRoleService() *RoleService {
	return &RoleService{}
}

var roleResponse = response_dtos.NewRoleDTO()

func (s *RoleService) GetAllRoles(ctc context.Context) ([]model.Role, error) {
	role, err := client.IRoleAdapter(&adapter.RoleAdapter{}).GetAllRoles()
	if err != nil {
		return nil, err
	}

	rolesModel := roleResponse.MapperListToGraphQLModel(role)

	return rolesModel, nil
}

func (s *RoleService) CreateRole(ctc context.Context, input model.RoleInput) (model.Role, error) {
	role, err := client.IRoleAdapter(&adapter.RoleAdapter{}).CreateRole(input)
	if err != nil {
		return model.Role{}, err
	}

	roleModel := roleResponse.MapperToGraphQLModel(role)

	return roleModel, nil
}