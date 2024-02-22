package mapper

import (
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/port/mapper/base"
)

func ReturnProjectObjectMapper(body map[string]interface{}) *response_dtos.ProjectResponseDTO {
	var input response_dtos.ProjectResponseDTO
	input.ID = body["_id"].(string)
	input.Name = body["name"].(string)
	input.Description = body["description"].(string)
	input.Status = body["status"].(string)
	input.Color = body["color"].(string)
	input.Owner = body["ownerId"].(float64)
	input.ActiveStatus = body["activeStatus"].(string)
	input.GroupTasks = base.ConvertStringToStringArray(body["groupTasks"].([]interface{}))
	input.CreatedAt = body["createdAt"].(string)
	input.UpdatedAt = body["updatedAt"].(string)
	return &input
}
