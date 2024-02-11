package mapper

import request_dtos "middleware_loader/core/domain/dtos/request"

func CreateProjectRequestDTOMapper(body map[string]interface{}) *request_dtos.CreateProjectRequestDTO {
	var input request_dtos.CreateProjectRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Name = bodyMap["name"].(string)
	input.Description = bodyMap["description"].(string)
	input.Status = bodyMap["status"].(string)
	input.Color = bodyMap["color"].(string)
	input.Owner = bodyMap["owner"].(string)
	input.ActiveStatus = bodyMap["activeStatus"].(string)

	return &input
}
