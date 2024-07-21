package mapper

import request_dtos "middleware_loader/core/domain/dtos/request"

func RegisterTaskConfigRequestDTOMapper(body map[string]interface{}) *request_dtos.TaskRegisterConfigRequestDTO {
	var input request_dtos.TaskRegisterConfigRequestDTO
	input.UserId = body["userId"].(float64)
	input.SleepDuration = body["sleepDuration"].(float64)
	input.StartSleepTime = body["startSleepTime"].(string)
	input.EndSleepTime = body["endSleepTime"].(string)
	input.RelaxTime = body["relaxTime"].(float64)
	input.TravelTime = body["travelTime"].(float64)
	input.EatTime = body["eatTime"].(float64)
	input.WorkTime = body["workTime"].(float64)
	return &input
}