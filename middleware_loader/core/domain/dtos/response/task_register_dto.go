package response_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type RegisterTaskConfigResponseDTO struct {
	UserId float64 `json:"userId"`
	WorkTime float64 `json:"workTime"`
}

func NewRegisterTaskConfigResponseDTO() *RegisterTaskConfigResponseDTO {
	return &RegisterTaskConfigResponseDTO{}
}

func (in *RegisterTaskConfigResponseDTO) MapperToGraphQLModel(input RegisterTaskConfigResponseDTO) model.RegisterTaskConfig {
	var out model.RegisterTaskConfig
	mapper.AutoMapper(&input, &out)
	return out
}

type IsTaskExistedResponseDTO struct {
	IsTaskExist bool `json:"isTaskExist"`
}

func NewIsTaskExistedResponseDTO() *IsTaskExistedResponseDTO {
	return &IsTaskExistedResponseDTO{}
}

func (in *IsTaskExistedResponseDTO) MapperToGraphQLModel(input IsTaskExistedResponseDTO) model.IsTaskExisted {
	var out model.IsTaskExisted
	mapper.AutoMapper(&input, &out)
	return out
}

type IsScheduleExistedResponseDTO struct {
	IsScheduleExist bool `json:"isScheduleExist"`
}

func NewIsScheduleExistedResponseDTO() *IsScheduleExistedResponseDTO {
	return &IsScheduleExistedResponseDTO{}
}

func (in *IsScheduleExistedResponseDTO) MapperToGraphQLModel(input IsScheduleExistedResponseDTO) model.IsScheduleExisted {
	var out model.IsScheduleExisted
	mapper.AutoMapper(&input, &out)
	return out
}