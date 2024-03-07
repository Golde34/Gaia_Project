package adapter_interface

import "middleware_loader/core/domain/models"

type IMicroserviceAdapter interface {
	GetMicroserviceByName(microserviceName string) (models.ErrorResponse, error)
}