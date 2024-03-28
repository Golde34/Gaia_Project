package mapper

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/port/mapper/base"
)

func UpdateUserRequestDTOMapper(body map[string]interface{}) *request_dtos.UpdateUserRequestDTO {
	var input request_dtos.UpdateUserRequestDTO
	bodyMap := body["body"].(map[string]interface{})

	input.UserId = base.GetFloatValue(bodyMap, "userId", 0)
	input.Name = base.GetStringValue(bodyMap, "name", "")
	input.Username = base.GetStringValue(bodyMap, "username", "")
	input.Email = base.GetStringValue(bodyMap, "email", "")
	input.Roles = base.GetArrayStringValue(bodyMap, "roles", []string{})

	return &input
}
