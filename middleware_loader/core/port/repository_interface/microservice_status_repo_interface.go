package repository_interface

import (
	"context"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/entity"
)

type IMicroserviceStatusRepository interface {
	GetMicroserviceStatus(context context.Context, microserviceStatus request_dtos.MicroserviceStatusDTO) (interface{}, error)
	InsertMicroservice(context context.Context, microserviceStatus entity.MicroserviceStatus) (interface{}, error)
}