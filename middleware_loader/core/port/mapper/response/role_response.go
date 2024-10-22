package mapper

import (
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/kernel/utils"
)

func ReturnGetAllRolesObjectMapper(body map[string]interface{}) *response_dtos.RoleDTO {
	var input response_dtos.RoleDTO
	input.ID = body["id"].(float64)
	input.Name = body["name"].(string)
	input.Description = utils.CheckNullPointer(body["description"])
	input.GrantedRank = body["grantedRank"].(float64)
	input.Privileges = body["privileges"].([]interface{})
	return &input
}
