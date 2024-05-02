package client_adapter

import (
	"fmt"
	response_dtos "middleware_loader/core/domain/dtos/response"
	mapper_response "middleware_loader/core/port/mapper/response"
	"middleware_loader/infrastructure/client/base"
)

type RoleAdapter struct {
	adapter *RoleAdapter
}

func NewRoleAdapter(adapter *RoleAdapter) *RoleAdapter {
	return &RoleAdapter{adapter: adapter}
}

func (adapter *RoleAdapter) GetAllRoles() ([]response_dtos.RoleDTO, error) {
	getAllRolesURL := base.AuthServiceURL + "/role/get-all-roles"
	var roles []response_dtos.RoleDTO

	bodyResult, err := base.BaseAPI(getAllRolesURL, "GET", nil)
	if err != nil {
		return []response_dtos.RoleDTO{}, err
	}

	bodyResultMap, ok := bodyResult.(map[string]interface{})
	if !ok {
		return []response_dtos.RoleDTO{}, fmt.Errorf("unexpected response format")
	}
	for _, roleElement := range bodyResultMap["message"].([]interface{}) {
		role := mapper_response.ReturnGetAllRolesObjectMapper(roleElement.(map[string]interface{}))
		roles = append(roles, *role)
	}

	return roles, nil
}