package mapper

import (
	"fmt"
	"log"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/kernel/utils"
)

func CreateNoteRequestDTOMapper(body map[string] interface{}) (*request_dtos.CreateNoteRequestDTO, string, error) {
	var input request_dtos.CreateNoteRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Name = utils.GetStringValue(bodyMap, "name", "")
	input.UserId = utils.GetFloatValue(bodyMap, "userId", 0)

	log.Println("input", input)
	contentFile, ok := bodyMap["contentFile"].(string)
	if !ok {
		return nil, "", fmt.Errorf("file not found in request body")
	}

	return &input, contentFile, nil
}

func UpdateNoteRequestDTOMapper(body map[string]interface{}, id string) *request_dtos.UpdateNoteRequestDTO {
	var input request_dtos.UpdateNoteRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Id= id
	input.Name = utils.GetStringValue(bodyMap, "name", "")
	input.UserId = utils.GetFloatValue(bodyMap, "userId", 0)
	return &input
}