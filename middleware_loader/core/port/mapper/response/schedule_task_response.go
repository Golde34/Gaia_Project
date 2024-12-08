package mapper

import response_dtos "middleware_loader/core/domain/dtos/response"

func ReturnScheduleTaskObjectMapper(body map[string]interface{}) *response_dtos.ScheduleTaskResponseDTO {
	var input response_dtos.ScheduleTaskResponseDTO
	input.ID = body["_id"].(string)
	if (body["title"] != nil) {
		input.Title = body["title"].(string)
	}
	if (body["priority"] != nil) {
		input.Priority = body["priority"].(float64)
	}
	if (body["status"] != nil) {
		input.Status = body["status"].(string)
	}
	if (body["startDate"] != nil) {
		input.StartDate = body["startDate"].(string)
	}
	if (body["deadline"] != nil) {
		input.Deadline = body["deadline"].(string)
	}
	if (body["duration"] != nil) {
		input.Duration = body["duration"].(float64)
	}
	if (body["activeStatus"] != nil) {
		input.ActiveStatus = body["activeStatus"].(string)
	}
	if (body["preferenceLevel"] != nil) {
		input.PreferenceLevel = body["preferenceLevel"].(float64)
	}
	if (body["taskId"] != nil) {
		input.TaskId = body["taskId"].(string)
	}
	input.IsSynchronizedWithWO = body["isSynchronizedWithWO"].(bool)
	input.TaskOrder = body["taskOrder"].(float64)
	input.Weight = body["weight"].(float64)
	input.StopTime = body["stopTime"].(float64)
	input.TaskBatch = body["taskBatch"].(float64)
	input.SchedulePlanId = body["schedulePlanId"].(string)
	return &input
}
