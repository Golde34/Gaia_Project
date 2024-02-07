package request

import (
	"log"
	"middleware_loader/core/domain/dtos"
	"reflect"
	"strconv"
)

func CreateTaskRequestDTOMapper(body map[string]interface{}) dtos.CreateTaskDTO {
	var input dtos.CreateTaskDTO
	bodyMap := body["body"].(map[string]interface{})
	input.Title = bodyMap["title"].(string)
	input.Description = bodyMap["description"].(string)
	input.Status = bodyMap["status"].(string)
	input.StartDate = bodyMap["startDate"].(string)
	input.Deadline = bodyMap["deadline"].(string)
	input.Duration = bodyMap["duration"].(string)
	input.Priority = convertStringToArrayString(bodyMap["priority"].([]interface{}))
	log.Printf(reflect.TypeOf(input.Priority).String())
	log.Printf(strconv.Itoa(len(input.Priority)))
		input.ActiveStatus = bodyMap["activeStatus"].(string)
	input.GroupTaskId = bodyMap["groupTaskId"].(string)

	return input
}

func convertStringToArrayString(aInterface []interface{}) []string {
	log.Println(aInterface)
	aString := []string{}
	for _, v := range aInterface {
		log.Println(v)
		aString = append(aString, v.(string))
	}
	return aString
}
