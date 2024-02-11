package mapper

import request_dtos "middleware_loader/core/domain/dtos/request"

func SigninRequestDTOMapper(body map[string]interface{}) request_dtos.AuthDTO {
	var input request_dtos.AuthDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Username = bodyMap["username"].(string)
	input.Password = bodyMap["password"].(string)
	return input
}