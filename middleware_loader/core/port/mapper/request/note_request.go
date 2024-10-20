package mapper

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/kernel/utils"
)

func CreateNoteRequestDTOMapper(body map[string] interface{}) *request_dtos.CreateNoteRequestDTO {
	var input request_dtos.CreateNoteRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Name = utils.GetStringValue(bodyMap, "name", "")
	input.UserId = utils.GetFloatValue(bodyMap, "userId", 0)
	return &input
}

func UpdateNoteRequestDTOMapper(body map[string]interface{}, id string) *request_dtos.UpdateNoteRequestDTO {
	var input request_dtos.UpdateNoteRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Id= id
	input.Name = utils.GetStringValue(bodyMap, "name", "")
	input.UserId = utils.GetFloatValue(bodyMap, "userId", 0)
	return &input
}