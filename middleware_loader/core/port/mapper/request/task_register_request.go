package mapper

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/kernel/utils"
)

func RegisterTaskConfigRequestDTOMapper(body map[string]interface{}) *request_dtos.TaskRegisterConfigRequestDTO {
	var input request_dtos.TaskRegisterConfigRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.UserId = utils.GetFloatValue(bodyMap, "userId", 0)
	return &input
}
