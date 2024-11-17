package services

import (
	"middleware_loader/core/port/client"
	adapter "middleware_loader/infrastructure/client"
)

type TaskOptimizationService struct{}

func NewTaskOptimizationService() *TaskOptimizationService {
	return &TaskOptimizationService{}
}

func (s *TaskOptimizationService) OptimizeTaskByUser(userId string) (string, error) {
	response, err := client.ITaskOptimizationAdapter(&adapter.TaskOptimizationAdapter{}).OptimizeTaskByUser(userId)
	if err != nil {
		return "", err
	}
	return response, nil
}