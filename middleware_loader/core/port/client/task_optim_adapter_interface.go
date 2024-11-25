package client

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
)

type ITaskOptimizationAdapter interface {
	OptimizeTaskByUser(input request_dtos.OptimizeTaskByUser) ([]response_dtos.OptimizedTaskByUser, error)
}