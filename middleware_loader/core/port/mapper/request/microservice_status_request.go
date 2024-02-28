package mapper

import request_dtos "middleware_loader/core/domain/dtos/request"

func MicroserviceStatusRequestDTOMapper(body map[string]interface{}) request_dtos.MicroserviceStatusDTO {
	var input request_dtos.MicroserviceStatusDTO
	input.MicroserviceName = body["microserviceName"].(string)
	input.Status = body["status"].(string)
	return input 
}