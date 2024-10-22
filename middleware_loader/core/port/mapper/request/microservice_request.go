package mapper

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"time"
)

func MicroserviceConfigurationRequestDTOMapper(body map[string]interface{}) request_dtos.MicroserviceConfigurationDTO {
	var input request_dtos.MicroserviceConfigurationDTO
	input.MicroserviceName = body["microserviceName"].(string)
	input.Status = body["status"].(bool)
	return input
}

func GetMicroserviceRequestDTOMapper(body map[string]interface{}) request_dtos.GetMicroserviceConfigurationDTO {
	var input request_dtos.GetMicroserviceConfigurationDTO
	input.MicroserviceName = body["microserviceName"].(string)
	return input
}

func InsertMicroserviceConfigurationRequestDTOMapper(body map[string]interface{}) request_dtos.InsertMicroserviceConfigurationDTO {
	var input request_dtos.InsertMicroserviceConfigurationDTO
	input.MicroserviceName = body["microserviceName"].(string)
	input.Status = body["status"].(bool)
	input.Port = body["port"].(string)
	input.CreatedAt = time.Now()
	return input
}
