package request

import (
	"middleware_loader/infrastructure/graph/model"
)

func SigninRequestDTOMapper(body map[string]interface{}) model.SigninInput {
	var input model.SigninInput
	bodyMap := body["body"].(map[string]interface{})
	input.Username = bodyMap["username"].(string)
	input.Password = bodyMap["password"].(string)
	return input
}