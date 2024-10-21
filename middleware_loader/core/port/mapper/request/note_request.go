package mapper

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/kernel/utils"
)

func CreateNoteRequestDTOMapper(body map[string] interface{}) (*request_dtos.CreateNoteRequestDTO, *os.File, error) {
	var input request_dtos.CreateNoteRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Name = utils.GetStringValue(bodyMap, "name", "")
	input.UserId = utils.GetFloatValue(bodyMap, "userId", 0)

	contentFile, ok := bodyMap["contentFile"].(string)
	if !ok {
		return nil, nil, fmt.Errorf("file not found in request body")
	}

	// Convert the base64 string back to binary data
	decodedFile, err := utils.DecodeBase64File(fileContent)
	if err != nil {
		return nil, nil, err
	}

	// Save the decoded content to a temporary file
	tempFile, err := utils.SaveToTempFile(decodedFile, input.Name+".txt")
	if err != nil {
		return nil, nil, err
	}

	return &input, tempFile, nil
}

func UpdateNoteRequestDTOMapper(body map[string]interface{}, id string) *request_dtos.UpdateNoteRequestDTO {
	var input request_dtos.UpdateNoteRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Id= id
	input.Name = utils.GetStringValue(bodyMap, "name", "")
	input.UserId = utils.GetFloatValue(bodyMap, "userId", 0)
	return &input
}