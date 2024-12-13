package mapper

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/kernel/utils"
)

func CreateGroupTaskRequestDTOMapper(body map[string]interface{}) *request_dtos.CreateGroupTaskRequestDTO {
	var input request_dtos.CreateGroupTaskRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Title = utils.GetStringValue(bodyMap, "title", "")
	input.Description = utils.GetStringValue(bodyMap, "description", "")
	input.Priority = utils.ConvertStringToStringArray(bodyMap["priority"].([]interface{}))
	input.Status = utils.GetStringValue(bodyMap, "status", "")
	input.ProjectId = utils.GetStringValue(bodyMap, "projectId", "")
	if bodyMap["tasks"] != nil {
		input.Tasks = utils.ConvertStringToStringArrayPointer(bodyMap["tasks"].([]interface{}))
	} else {
		input.Tasks = &[]string{}
	}
	return &input
}

func UpdateGroupTaskRequestDTOMapper(body map[string]interface{}, id string) *request_dtos.UpdateGroupTaskRequestDTO {
	var input request_dtos.UpdateGroupTaskRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.GroupTaskId = id
	input.Title = utils.GetStringValue(bodyMap, "title", "")
	input.Description = utils.GetStringValue(bodyMap, "description", "")
	input.Priority = utils.ConvertStringToStringArray(bodyMap["priority"].([]interface{}))
	input.Status = utils.GetStringValue(bodyMap, "status", "")
	input.ProjectId = utils.GetStringValue(bodyMap, "projectId", "")
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


func GetTaskDetailRequestDTOMapper(body map[string]interface{}) request_dtos.GetTaskDetailInputDTO {
	var input request_dtos.GetTaskDetailInputDTO
	bodyMap := body["body"].(map[string]interface{})
	input.UserId = bodyMap["userId"].(float64)
	input.TaskId = bodyMap["taskId"].(string)
	input.ScheduleTaskId = bodyMap["scheduleTaskId"].(string)
	return input
}