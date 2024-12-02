package mapper

import request_dtos "notify_agent/core/domain/dtos/request"


func InsertOptimizeTaskRequestMapper(messageId, userId, optimizeStatus string) request_dtos.InsertNotificationRequestDTO {
	var input request_dtos.InsertNotificationRequestDTO
	input.UserId = userId
	input.Status = "INIT" 
	input.Content = "Optimize Task " + optimizeStatus
	input.Type = "OPTIMIZE"
	input.IsRead = false
	input.MessageID = messageId
	return input 
}