package mapper

import response_dtos "middleware_loader/core/domain/dtos/response"

func ReturnOptimizedTaskListMapper(body map[string]interface{}) *response_dtos.OptimizedTaskByUser {
	var input response_dtos.OptimizedTaskByUser
	input.Id = body["id"].(string)
	input.Title = body["title"].(string)
	if body["priority"] != nil {
		input.Priority = body["priority"].(float64)
	}
	input.Status = body["status"].(string)
	if body["startDate"] != nil {
		input.StartDate = body["startDate"].(float64)
	}
	if body["endDate"] != nil {
		input.EndDate = body["endDate"].(float64)
	}
	input.ActiveStatus = body["activeStatus"].(string)
	input.OriginalId = body["originalId"].(string)
	if body["taskOrder"] != nil {
		input.TaskOrder = body["taskOrder"].(float64)
	}
	if body["effort"] != nil {
		input.Effort = body["effort"].(float64)
	}
	if body["enjoyability"] != nil {
		input.Enjoyability = body["enjoyability"].(float64)
	}
	if body["duration"] != nil {
		input.Duration = body["duration"].(float64)
	}
	if body["weight"] != nil {
		input.Weight = body["weight"].(float64)
	}
	if body["stopTime"] != nil {
		input.StopTime = body["stopTime"].(float64)
	}
	if body["taskBatch"] != nil {
		input.TaskBatch = body["taskBatch"].(float64)
	}
	if body["scheduleTaskId"] != nil {
		input.ScheduleTaskId = body["scheduleTaskId"].(string)
	}
	return &input
}
