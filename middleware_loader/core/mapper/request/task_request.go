package mapper

import (
	"log"
	request_dtos "middleware_loader/core/domain/dtos/request"
	// "github.com/mitchellh/mapstructure"
)

func CreateTaskRequestDTOMapper(body map[string]interface{}) request_dtos.CreateTaskRequestDTO {
	var input request_dtos.CreateTaskRequestDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Title = bodyMap["title"].(string)
	input.Description = bodyMap["description"].(string)
	input.Status = bodyMap["status"].(string)
	input.StartDate = bodyMap["startDate"].(string)
	input.Deadline = bodyMap["deadline"].(string)
	input.Duration = bodyMap["duration"].(string)
	input.ActiveStatus = bodyMap["activeStatus"].(string)
	input.GroupTaskId = bodyMap["groupTaskId"].(string)
	input.Priority = ConvertStringToStringArray(bodyMap["priority"].([]interface{}))
	
	return input
}

func ConvertStringToStringArray(aInterface []interface{}) []string {
	aString := []string{}
	for _, v := range aInterface {
		log.Println(v)
		aString = append(aString, v.(string))
	}
	return aString
}

// func CreateTaskRequestDTOMapper(body map[string]interface{}) dtos.CreateTaskDTO {
// 	var input dtos.CreateTaskDTO
// 	bodyMap := body["body"].(map[string]interface{})
// 	mapStructure.Decode(bodyMap, &input)

// 	if priority, ok := bodyMap["priority"].([]interface{}); ok {
// 		input.Priority = convertStringToArrayString(priority)
// 	}

// 	return input
// }