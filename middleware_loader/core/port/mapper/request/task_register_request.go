package mapper

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/kernel/utils"
)

func RegisterTaskConfigRequestDTOMapper(body map[string]interface{}) *request_dtos.TaskRegisterConfigRequestDTO {
	var input request_dtos.TaskRegisterConfigRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.UserId = utils.GetFloatValue(bodyMap, "userId", 0)
	input.SleepDuration = utils.GetFloatValue(bodyMap, "sleepDuration", 0)
	input.StartSleepTime = utils.GetStringValue(bodyMap, "startSleepTime", "")
	input.EndSleepTime = utils.GetStringValue(bodyMap, "endSleepTime", "")
	input.RelaxTime = utils.GetFloatValue(bodyMap, "relaxTime", 0)
	input.TravelTime = utils.GetFloatValue(bodyMap, "travelTime", 0)
	input.EatTime = utils.GetFloatValue(bodyMap, "eatTime", 0)
	input.WorkTime = utils.GetFloatValue(bodyMap, "workTime", 0)
	return &input
}
