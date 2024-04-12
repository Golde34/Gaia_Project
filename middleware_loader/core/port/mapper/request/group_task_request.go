package mapper

import request_dtos "middleware_loader/core/domain/dtos/request"

func CreateGroupTaskRequestDTOMapper(body map[string]interface{}) request_dtos.CreateGroupTaskRequestDTO {
	var input request_dtos.CreateGroupTaskRequestDTO
	input.Title = body["title"].(string)
	input.Description = body["description"].(string)
	input.ProjectId = body["projectId"].(string)
	return input
}