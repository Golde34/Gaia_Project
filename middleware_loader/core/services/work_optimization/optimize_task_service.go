package services

import (
	"fmt"
	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/port/client"
	adapter "middleware_loader/infrastructure/client"
)

type TaskOptimizationService struct{}

func NewTaskOptimizationService() *TaskOptimizationService {
	return &TaskOptimizationService{}
}

func (s *TaskOptimizationService) OptimizeTaskByUser(input request_dtos.OptimizeTaskByUser) ([]response_dtos.OptimizedTaskByUser, error) {
	response, err := client.ITaskOptimizationAdapter(&adapter.TaskOptimizationAdapter{}).OptimizeTaskByUser(input)
	if err != nil {
		return nil, fmt.Errorf("service error in OptimizeTaskByUser: %w", err)
	}
	return response, nil
}