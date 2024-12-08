package client

import response_dtos "middleware_loader/core/domain/dtos/response"

type IScheduleTaskAdapter interface {
    GetScheduleTaskListByUserId(userId string) ([]response_dtos.ScheduleTaskResponseDTO, error)
}