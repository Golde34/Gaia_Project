package mapper

import (
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/kernel/utils"
)

func ReturnGetAllPrivilegesObjectMapper(body map[string]interface{}) *response_dtos.PrivilegeDTO {
	var input response_dtos.PrivilegeDTO
	input.ID = body["id"].(float64)
	input.Name = body["name"].(string)
	input.Description = utils.CheckNullPointer(body["description"])
	input.Roles = body["roles"].([]interface{})
	return &input
}