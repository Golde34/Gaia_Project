package mapper

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/kernel/utils"
)

func CreateRoleRequestMapper(body map[string]interface{}) *request_dtos.CreateRoleRequestDTO {
	var input request_dtos.CreateRoleRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.ID = utils.GetFloatValue(bodyMap, "id", 0)
	input.Name = utils.GetStringValue(bodyMap, "name", "")
	input.Description = utils.GetStringValue(bodyMap, "description", "")
	input.GrantedRank = utils.GetFloatValue(bodyMap, "grantedRank", 0)
	return &input
}