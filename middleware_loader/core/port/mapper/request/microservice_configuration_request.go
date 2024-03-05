package mapper

import request_dtos "middleware_loader/core/domain/dtos/request"

func MicroserviceConfigurationRequestDTOMapper(body map[string]interface{}) request_dtos.MicroserviceConfigurationDTO {
	var input request_dtos.MicroserviceConfigurationDTO
	input.MicroserviceName = body["microserviceName"].(string)
	input.Status = body["status"].(string)
	return input 
}

func GetMicroserviceRequestDTOMapper(body map[string]interface{}) request_dtos.GetMicroserviceConfigurationDTO {
	var input request_dtos.GetMicroserviceConfigurationDTO
	input.MicroserviceName = body["microserviceName"].(string)
	return input
}