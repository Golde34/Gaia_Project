package client 

import "middleware_loader/core/domain/dtos/base"

type IMicroserviceAdapter interface {
	GetMicroserviceByName(microserviceName string) (base_dtos.ErrorResponse, error)
}