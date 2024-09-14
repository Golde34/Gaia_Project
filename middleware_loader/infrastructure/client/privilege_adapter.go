package client_adapter

import (
	"fmt"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/domain/enums"
	mapper_response "middleware_loader/core/port/mapper/response"
	"middleware_loader/infrastructure/client/base"
	"middleware_loader/kernel/utils"
)

type PrivilegeAdapter struct {
	adapter *PrivilegeAdapter
}

func NewPrivilegeAdapter(adapter *PrivilegeAdapter) *PrivilegeAdapter {
	return &PrivilegeAdapter{adapter: adapter}
}

func (adapter *PrivilegeAdapter) GetAllPrivileges() ([]response_dtos.PrivilegeDTO, error) {
	getAllPrivilegesURL := base.AuthServiceURL + "/privilege/get-all-privileges"
	var privileges []response_dtos.PrivilegeDTO
	headers := utils.BuildAuthorizationHeaders(enums.AS, "1")
	bodyResult, err := utils.BaseAPI(getAllPrivilegesURL, "GET", nil, headers)
	if err != nil {
		return []response_dtos.PrivilegeDTO{}, err
	}

	bodyResultMap, ok := bodyResult.(map[string]interface{})
	if !ok {
		return []response_dtos.PrivilegeDTO{}, fmt.Errorf("unexpected response format")
	}
	for _, privilegeElement := range bodyResultMap["message"].([]interface{}) {
		privilege := mapper_response.ReturnGetAllPrivilegesObjectMapper(privilegeElement.(map[string]interface{}))
		privileges = append(privileges, *privilege)
	}

	return privileges, nil
}