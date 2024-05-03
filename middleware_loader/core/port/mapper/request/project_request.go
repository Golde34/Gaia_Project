package mapper

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/kernel/utils"
)

func GetId(id string) *request_dtos.IdInputDTO {
	var input request_dtos.IdInputDTO
	input.Id = id
	return &input
}

func CreateProjectRequestDTOMapper(body map[string]interface{}) *request_dtos.CreateProjectRequestDTO {
	var input request_dtos.CreateProjectRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Name = utils.GetStringValue(bodyMap, "name", "")
	input.Description = utils.GetStringValue(bodyMap, "description", "")
	input.Status = utils.GetStringValue(bodyMap, "status", "")
	input.Color = utils.GetStringValue(bodyMap, "color", "")
	input.OwnerId = utils.GetStringValue(bodyMap, "ownerId", "")
	input.ActiveStatus = utils.GetStringValue(bodyMap, "activeStatus", "")

	return &input
}

func UpdateProjectRequestDTOMapper(body map[string]interface{}, projectId string) *request_dtos.UpdateProjectRequestDTO {
	var input request_dtos.UpdateProjectRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Name = bodyMap["name"].(string)
	input.Description = bodyMap["description"].(string)
	input.Status = bodyMap["status"].(string)
	input.Color = bodyMap["color"].(string)
	input.Owner = bodyMap["owner"].(string)
	input.ActiveStatus = bodyMap["activeStatus"].(string)
	input.ProjectId = projectId

	return &input
}

func UpdateProjectNameRequestDTOMapper(body map[string]interface{}, projectId string) *request_dtos.UpdateProjectNameInputDTO {
	var input request_dtos.UpdateProjectNameInputDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Name = bodyMap["newName"].(string)
	input.ID = projectId

	return &input
}

func UpdateProjectColorRequestDTOMapper(body map[string]interface{}, projectId string) *request_dtos.UpdateProjectColorInputDTO {
	var input request_dtos.UpdateProjectColorInputDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Color = bodyMap["color"].(string)
	input.ID = projectId

	return &input
}
