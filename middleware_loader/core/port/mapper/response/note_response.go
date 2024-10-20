package mapper

import response_dtos "middleware_loader/core/domain/dtos/response"

func ReturnNoteObjectMapper(body map[string]interface{}) *response_dtos.NoteResponseDTO {
	var input response_dtos.NoteResponseDTO
	input.ID = body["id"].(string)
	input.Name = body["name"].(string)
	if body["summaryDisplayText"] != nil {
		summaryDisplayText := body["summaryDisplayText"].(string)
		input.SummaryDisplayText = &summaryDisplayText
	}
	input.IsLock = body["isLock"].(bool)
	input.ActiveStatus = body["activeStatus"].(string)
	input.CreatedAt = body["createdAt"].(string)
	input.UpdatedAt = body["updatedAt"].(string)
	input.OwnerID = body["ownerId"].(float64)
	return &input	
}
