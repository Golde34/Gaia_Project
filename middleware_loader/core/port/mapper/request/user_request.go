package mapper

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/kernel/utils"
)

func UpdateUserRequestDTOMapper(body map[string]interface{}) *request_dtos.UpdateUserRequestDTO {
	var input request_dtos.UpdateUserRequestDTO
	bodyMap := body["body"].(map[string]interface{})

	input.UserId = utils.GetFloatValue(bodyMap, "userId", 0)
	input.Name = utils.GetStringValue(bodyMap, "name", "")
	input.Username = utils.GetStringValue(bodyMap, "username", "")
	input.Email = utils.GetStringValue(bodyMap, "email", "")
	input.Roles = utils.GetArrayStringValue(bodyMap, "roles", []string{})

	return &input
}
