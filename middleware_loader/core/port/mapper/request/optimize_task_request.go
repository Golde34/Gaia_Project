package mapper

import request_dtos "middleware_loader/core/domain/dtos/request"

func OptimizeTaskByUserRequestDTOMapper(body map[string]interface{}) request_dtos.OptimizeTaskByUser {
	var input request_dtos.OptimizeTaskByUser
	bodyMap := body["body"].(map[string]interface{})
	input.UserId = bodyMap["userId"].(float64)
	input.OptimizedDate = bodyMap["optimizedDate"].(string)

	return input
}