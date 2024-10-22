package client

import (
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/graph/model"
)

type ITaskRegisterAdapter interface {
	RegisterTaskConfig(input model.RegisterTaskInput) (response_dtos.RegisterTaskConfigResponseDTO, error)
	IsTaskExisted(input model.UserIDInput) (response_dtos.IsTaskExistedResponseDTO, error)
	IsScheduleExisted(input model.UserIDInput) (response_dtos.IsScheduleExistedResponseDTO, error)
	QueryTaskConfig(input model.UserIDInput) (response_dtos.IsTaskConfigExistedResponseDTO, error)
}