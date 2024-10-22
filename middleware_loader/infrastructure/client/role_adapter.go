package client_adapter

import (
	"fmt"
	converter_dtos "middleware_loader/core/domain/dtos/converter"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/domain/enums"
	mapper_response "middleware_loader/core/port/mapper/response"
	"middleware_loader/infrastructure/client/base"
	"middleware_loader/infrastructure/graph/model"
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
	headers := utils.BuildAuthorizationHeaders(enums.AS, "1")
	bodyResult, err := utils.BaseAPI(getAllRolesURL, "GET", nil, headers)
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
	headers := utils.BuildAuthorizationHeaders(enums.AS, "1")
	result, err := utils.BaseAPIV2(createRoleURL, "POST", input, &role, headers)
	if err != nil {
		return response_dtos.RoleDTO{}, err
	}
	return result.(response_dtos.RoleDTO), nil
}

func (adapter *RoleAdapter) UpdateRole(input model.RoleInput) (response_dtos.RoleDTO, error) {
	updateRoleURL := base.AuthServiceURL + "/role/update-role"
	var role response_dtos.RoleDTO
	headers := utils.BuildAuthorizationHeaders(enums.AS, "1")
	result, err := utils.BaseAPIV2(updateRoleURL, "PUT", input, &role, headers)
	if err != nil {
		return response_dtos.RoleDTO{}, err
	}
	return result.(response_dtos.RoleDTO), nil
}

func (adapter *RoleAdapter) DeleteRole(input model.RoleInput) (response_dtos.RoleDTO, error) {
	deleteRoleURL := base.AuthServiceURL + "/role/delete-role"
	var role response_dtos.RoleDTO
	headers := utils.BuildAuthorizationHeaders(enums.AS, "1")
	result, err := utils.BaseAPIV2(deleteRoleURL, "DELETE", input, &role, headers)
	if err != nil {
		return response_dtos.RoleDTO{}, err
	}
	return result.(response_dtos.RoleDTO), nil
} 

func (adapter *RoleAdapter) GetRole(input converter_dtos.NameConverterDTO) (response_dtos.RoleDTO, error) {
	getRoleURL := base.AuthServiceURL + "role/get-role"
	var role response_dtos.RoleDTO
	headers := utils.BuildAuthorizationHeaders(enums.AS, "1")
	result, err := utils.BaseAPIV2(getRoleURL, "GET", input, &role, headers)
	if err != nil {
		return response_dtos.RoleDTO{}, err
	}
	return result.(response_dtos.RoleDTO), nil
}

func (adapter *RoleAdapter) AddPrivilegeToRole(input model.RoleInput) (response_dtos.RoleDTO, error) {
	addPrivilegeURL := base.AuthServiceURL + "/add-privilege-to-role"
	var role response_dtos.RoleDTO
	headers := utils.BuildAuthorizationHeaders(enums.AS, "1")
	result, err := utils.BaseAPIV2(addPrivilegeURL, "PUT", input, &role, headers)
	if err != nil {
		return response_dtos.RoleDTO{}, err
	}
	return result.(response_dtos.RoleDTO), nil
}
