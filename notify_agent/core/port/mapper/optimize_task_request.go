package mapper

import request_dtos "notify_agent/core/domain/dtos/request/insert_notifi_request.go"

func InsertOptimizeTaskRequestMapper(userId, optimizeStatus string) request_dtos.InsertNotificationRequestDTO {
	var input request_dtos.InsertNotificationRequestDTO
	input.UserId = userId
	input.Status = optimizeStatus
	input.Content = "Optimize Task " + optimizeStatus
	input.Type = "OPTIMIZE"
	input.IsRead = false
	return input 
}