package services

import (
	"context"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/port/client"
	adapter "middleware_loader/infrastructure/client"
	"middleware_loader/infrastructure/graph/model"
)

type TaskRegisterService struct{}

func NewTaskRegisterService() *TaskRegisterService {
	return &TaskRegisterService{}
}

func (s *TaskRegisterService) RegisterTaskConfig(ctx context.Context, input model.RegisterTaskInput) (model.RegisterTaskConfig, error) {
	response, err := client.ITaskRegisterAdapter(&adapter.TaskRegisterAdapter{}).RegisterTaskConfig(input)
	if err != nil {
		return model.RegisterTaskConfig{}, err
	}
	taskRegisterModel := response_dtos.NewRegisterTaskConfigResponseDTO().MapperToGraphQLModel(response)
	return taskRegisterModel, nil
}

func (s *TaskRegisterService) IsTaskExisted(ctx context.Context, input model.RegisterTaskInput) (model.IsTaskExisted, error) {
	response, err := client.ITaskRegisterAdapter(&adapter.TaskRegisterAdapter{}).IsTaskExisted(input)
	if err != nil {
		return model.IsTaskExisted{}, err
	}
	taskRegisterModel := response_dtos.NewIsTaskExistedResponseDTO().MapperToGraphQLModel(response)
	return taskRegisterModel, nil
}

func (s *TaskRegisterService) IsScheduleExisted(ctx context.Context, input model.RegisterTaskInput) (model.IsScheduleExisted, error) {
	response, err := client.ITaskRegisterAdapter(&adapter.TaskRegisterAdapter{}).IsScheduleExisted(input)
	if err != nil {
		return model.IsScheduleExisted{}, err
	}
	taskRegisterModel := response_dtos.NewIsScheduleExistedResponseDTO().MapperToGraphQLModel(response)
	return taskRegisterModel, nil
}

func (s *TaskRegisterService) QueryTaskConfig(ctx context.Context, input model.RegisterTaskInput) (model.IsTaskConfigExisted, error) {
	response, err := client.ITaskRegisterAdapter(&adapter.TaskRegisterAdapter{}).QueryTaskConfig(input)
	if err != nil {
		return model.IsTaskConfigExisted{}, err
	}
	taskRegisterModel := response_dtos.NewIsTaskConfigExistedResponseDTO().MapperToGraphQLModel(response)
	return taskRegisterModel, nil
}