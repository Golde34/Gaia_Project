package client_adapter

import (
	"fmt"
	converter_dtos "middleware_loader/core/domain/dtos/converter"
	response_dtos "middleware_loader/core/domain/dtos/response"
	mapper_response "middleware_loader/core/port/mapper/response"
	"middleware_loader/infrastructure/client/base"
	"middleware_loader/kernel/utils"
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

	bodyResult, err := utils.BaseAPI(getAllRolesURL, "GET", nil)
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

func (adapter *RoleAdapter) CreateRole(input model.RoleInput) (response_dtos.RoleDTO, error) {
	createRoleURL := base.AuthServiceURL + "/role/create-role"
	var role response_dtos.RoleDTO
	result, err := utils.BaseAPIV2(createRoleURL, "POST", input, &role)
	if err != nil {
		return response_dtos.RoleDTO{}, err
	}
	return result.(response_dtos.RoleDTO), nil
}

func (adapter *RoleAdapter) UpdateRole(input model.RoleInput) (response_dtos.RoleDTO, err) {
	updateRoleURL := base.AuthServiceURL + "/role/update-role"
	var role response_dtos.RoleDTO
	result, err := utils.BaseAPIV2(updateRoleURL, "PUT", input, &role)
	if err != nil {
		return response_dtos.RoleDTO{}, err
	}
	return result.(response_dtos.RoleDTO), nil
}

func (adapter *RoleAdapter) DeleteRole(input model.RoleInput) (response_dtos.RoleDTO, err) {
	deleteRoleURL := base.AuthServiceURL + "/role/delete-role"
	var role response_dtos.RoleDTO
	result, err := utils.BaseAPIV2(deleteRoleURL, "DELETE", input, &role)
	if err != nil {
		return response_dtos.RoleDTO{}, err
	}
	return result.(response_dtos.RoleDTO), nil
} 

func (adapter *RoleAdapter) GetRole(input converter_dtos.NameConverterDTO) (response_dtos.RoleDTO) {
	getRoleURL := basee.AuthServiceURL + "role/get-role"
	var role response_dtos.RoleDTO
	result, err := utils.BaseAPIV2(getRoleURL, "GET", input, &role)
	if err != nil {
		return response_dtos.RoleDTO{}
	}
	return result.(response_dtos.RoleDTO), nil
}

func (adapter *RoleAdapter) AddPrivilegeToRole(input model.RoleInput) (response_dtos.RoleDTO, err) {
	addPrivilegeURL := base.AuthServiceURL + "/add-privilege-to-role"
	var role response_dtos.RoleDTO
	result, err := utils.BaseAPIV2(addPrivilegeURL, "PUT", input, &role)
	if err != nil {
		return response_dtos.RoleDTO{}, err
	}
	return result.(response_dtos.RoleDTO), nil
}
