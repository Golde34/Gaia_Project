package request

import (
	"middleware_loader/core/domain/dtos"
)

func SigninRequestDTOMapper(body map[string]interface{}) dtos.AuthDTO {
	var input dtos.AuthDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Username = bodyMap["username"].(string)
	input.Password = bodyMap["password"].(string)
	return input
}