package mapper

import (
	"fmt"
	base_dtos "middleware_loader/core/domain/dtos/base"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/kernel/utils"
	"net/http"
	"strconv"
)

func CreateNoteRequestDTOMapper(r *http.Request, fileObject base_dtos.FileObject) (*request_dtos.CreateNoteRequestDTO, error) {
	var input request_dtos.CreateNoteRequestDTO
	// Extract "name" from the form data
	name := r.FormValue("name")
	if name == "" {
		return nil, fmt.Errorf("name is required")	
	}
	input.Name = name
	
	// Extract "userId" from the form data
	userIdStr := r.FormValue("userId")
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		return nil, fmt.Errorf("userId is required")
	}
	input.OwnerId = float64(userId) 

	input.FileId = fileObject.FileId 
	input.FileName = fileObject.FileName
	input.SummaryDisplayText = fileObject.FileContent
	return &input, nil
}

func UpdateNoteRequestDTOMapper(body map[string]interface{}, id string) *request_dtos.UpdateNoteRequestDTO {
	var input request_dtos.UpdateNoteRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Id= id
	input.Name = utils.GetStringValue(bodyMap, "name", "")
	input.OwnerId = utils.GetFloatValue(bodyMap, "userId", 0)
	return &input
}