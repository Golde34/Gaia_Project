package services

import (
	"context"
	converter_dtos "middleware_loader/core/domain/dtos/converter"
	"middleware_loader/core/port/client"
	"middleware_loader/core/services/base"
	adapter "middleware_loader/infrastructure/client"
	"middleware_loader/infrastructure/graph/model"
)

type GroupTaskService struct {}

func NewGroupTaskService() *GroupTaskService {
	return &GroupTaskService{}
}

// var groupTaskValidation = validator.NewGroputaskDTOValidator()

func (s *GroupTaskService) GetGroupTaskById(ctx context.Context, input model.IDInput) (model.GroupTask, error) {
	groupTasks, err := client.IGroupTaskAdapter(&adapter.GroupTaskAdapter{}).GetGroupTaskById(input.ID)
	if err != nil {
		return model.GroupTask{}, err
	} 
	groupTaskModel := groupTaskResponse.MapperToGraphQLModel(groupTasks)

	return groupTaskModel, nil
}

func (s *GroupTaskService) CreateGroupTask(ctx context.Context, input model.CreateGroupTaskInput) (model.GroupTask, error) {
	groupTask, err := client.IGroupTaskAdapter(&adapter.GroupTaskAdapter{}).CreateGroupTask(input)
	if err != nil {
		return model.GroupTask{}, err
	}
	groupTaskModel := groupTaskResponse.MapperToGraphQLModel(groupTask)

	return groupTaskModel, nil
}

func (s *GroupTaskService) UpdateGroupTask(ctx context.Context, input model.UpdateGroupTaskInput) (model.GroupTask, error) {
	input.Priority = base.ConvertStringToArray(input.Priority)
	groupTaskId := input.GroupTaskID
	groupTask, err := client.IGroupTaskAdapter(&adapter.GroupTaskAdapter{}).UpdateGroupTask(input, groupTaskId)
	if err != nil {
		return model.GroupTask{}, err
	}
	groupTaskModel := groupTaskResponse.MapperToGraphQLModel(groupTask)

	return groupTaskModel, nil
}

func (s *GroupTaskService) DeleteGroupTask(ctx context.Context, input model.IDInput) (model.GroupTask, error) {
	groupTask, err := client.IGroupTaskAdapter(&adapter.GroupTaskAdapter{}).DeleteGroupTask(input.ID)
	if err != nil {
		return model.GroupTask{}, err
	}
	groupTaskModel := groupTaskResponse.MapperToGraphQLModel(groupTask)

	return groupTaskModel, nil
}

func (s *GroupTaskService) GetTasksInGroupTask(ctx context.Context, input model.IDInput) ([]model.Task, error) {
	tasks, err := client.IGroupTaskAdapter(&adapter.GroupTaskAdapter{}).GetTasksInGroupTask(input.ID)
	if err != nil {
		return nil, err
	}
	tasksModel := taskResponse.MapperListToGraphQLModel(tasks)

	return tasksModel, nil
}

func (s *GroupTaskService) UpdateGroupTaskName(ctx context.Context, input model.UpdateObjectNameInput) (model.GroupTask, error) {
	groupTaskId := input.ID
	groupTaskRequestModel := converter_dtos.UpdateNameConverterDTO{
		Name: input.Name,
	}
	groupTask, err := client.IGroupTaskAdapter(&adapter.GroupTaskAdapter{}).UpdateGroupTaskName(groupTaskRequestModel, groupTaskId)
	if err != nil {
		return model.GroupTask{}, err
	}
	groupTaskModel := groupTaskResponse.MapperToGraphQLModel(groupTask)

	return groupTaskModel, nil
}

func (s *GroupTaskService) CalculateCompletedTasks(ctx context.Context, input model.IDInput) (model.GroupTask, error) {
	groupTask, err := client.IGroupTaskAdapter(&adapter.GroupTaskAdapter{}).CalculateCompletedTasks(input.ID)
	if err != nil {
		return model.GroupTask{}, err
	}
	groupTaskModel := groupTaskResponse.MapperToGraphQLModel(groupTask)

	return groupTaskModel, nil
}

func (s *GroupTaskService) UpdateGroupTaskOrdinal(ctx context.Context, input model.ProjectGroupTaskIDInput) (model.GroupTask, error) {
	groupTaskID := input.GroupTaskID
	groupTask, err := client.IGroupTaskAdapter(&adapter.GroupTaskAdapter{}).UpdateGroupTaskOrdinal(input, groupTaskID)
	if err != nil {
		return model.GroupTask{}, err
	}
	groupTaskModel := groupTaskResponse.MapperToGraphQLModel(groupTask)

	return groupTaskModel, nil
}

func (s *GroupTaskService) ArchiveGroupTask(ctx context.Context, input model.IDInput) (model.GroupTask, error) {
	groupTask, err := client.IGroupTaskAdapter(&adapter.GroupTaskAdapter{}).ArchiveGroupTask(input.ID)
	if err != nil {
		return model.GroupTask{}, err
	}
	groupTaskModel := groupTaskResponse.MapperToGraphQLModel(groupTask)

	return groupTaskModel, nil
}

func (s *GroupTaskService) EnableGroupTask(ctx context.Context, input model.IDInput) (model.GroupTask, error) {
	groupTask, err := client.IGroupTaskAdapter(&adapter.GroupTaskAdapter{}).EnableGroupTask(input.ID)
	if err != nil {
		return model.GroupTask{}, err
	}
	groupTaskModel := groupTaskResponse.MapperToGraphQLModel(groupTask)

	return groupTaskModel, nil
}
