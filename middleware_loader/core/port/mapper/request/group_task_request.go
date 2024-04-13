package mapper

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/port/mapper/base"
)

func CreateGroupTaskRequestDTOMapper(body map[string]interface{}) *request_dtos.CreateGroupTaskRequestDTO {
	var input request_dtos.CreateGroupTaskRequestDTO
	input.Title = body["title"].(string)
	input.Description = body["description"].(string)
	input.Priority = base.ConvertStringToStringArray(body["priority"].([]interface{}))
	input.Status = body["status"].(string)
	input.ProjectId = body["projectId"].(string)
	return &input
}

func UpdateGroupTaskRequestDTOMapper(body map[string]interface{}) *request_dtos.UpdateGroupTaskRequestDTO {
	var input request_dtos.UpdateGroupTaskRequestDTO
	input.Title = body["title"].(string)
	input.Description = body["description"].(string)
	input.Priority = base.ConvertStringToStringArray(body["priority"].([]interface{}))
	input.Status = body["status"].(string)
	input.GroupTaskId = body["groupTaskId"].(string)
	input.ProjectId = body["projectId"].(string)
	return &input
}

func UpdateGroupTaskNameRequestDTOMapper(body map[string]interface{}, groupTaskId string) *request_dtos.UpdateGroupTaskNameInputDTO {
	var input request_dtos.UpdateGroupTaskNameInputDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Name = bodyMap["newName"].(string)
	input.ID = groupTaskId 

	return &input
}

func GetProjectGroupTaskId(body map[string]interface{}, groupTaskId string) *request_dtos.GetProjectGroupTaskIdInputDTO {
	var input request_dtos.GetProjectGroupTaskIdInputDTO
	bodyMap := body["body"].(map[string]interface{})
	input.ProjectId = bodyMap["projectId"].(string)
	input.GroupTaskId = groupTaskId
	return &input
}