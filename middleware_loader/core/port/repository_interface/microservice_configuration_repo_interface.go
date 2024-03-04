package repository_interface

import (
	"context"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/entity"
)

type IMicroserviceConfigurationRepository interface {
	GetMicroserviceByName(context context.Context, microserviceConfiguration request_dtos.GetMicroserviceConfigurationDTO) (interface{}, error)
	GetMicroservice(context context.Context, microserviceConfiguration request_dtos.MicroserviceConfigurationDTO) (interface{}, error)
	InsertMicroservice(context context.Context, microserviceConfiguration entity.MicroserviceConfiguration) (interface{}, error)
}