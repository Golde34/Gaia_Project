package repository_interface

import request_dtos "middleware_loader/core/domain/dtos/request"

type IMicroserviceStatusRepository interface {
	InsertMicroserviceStatus(microserviceStatus request_dtos.MicroserviceStatusDTO) error
}