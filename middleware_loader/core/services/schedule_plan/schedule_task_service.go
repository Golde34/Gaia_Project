package services

import (
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/port/client"
	adapter "middleware_loader/infrastructure/client"
)

type ScheduleTaskService struct {}

func NewScheduleTaskService() *ScheduleTaskService {
	return &ScheduleTaskService{}
}

func (s *ScheduleTaskService) GetScheduleTaskListByUserId(userId string) ([]response_dtos.ScheduleTaskResponseDTO, error) {
	scheduleTasks, err := client.IScheduleTaskAdapter(&adapter.ScheduleTaskAdapter{}).GetScheduleTaskListByUserId(userId)
	if err != nil {
		return nil, err
	}
	return scheduleTasks, nil
}