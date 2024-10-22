package services

import (
	"context"
	converter_dtos "middleware_loader/core/domain/dtos/converter"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/port/client"
	adapter "middleware_loader/infrastructure/client"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
)

type GroupTaskService struct{}

func NewGroupTaskService() *GroupTaskService {
	return &GroupTaskService{}
}

// var groupTaskValidation = validator.NewGroputaskDTOValidator()
var taskDashboardResponse = response_dtos.NewTaskDashboardResponseDTO()
var taskTableResponse = response_dtos.NewTaskTableResponseDTO()

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
	input.Priority = utils.ConvertStringToArray(input.Priority)
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

func (s *GroupTaskService) GetTasksByGroupTask(ctx context.Context, input model.IDInput) (model.TaskDashboard, error) {
	taskDashboard, err := client.IGroupTaskAdapter(&adapter.GroupTaskAdapter{}).GetTasksByGroupTask(input.ID)
	if err != nil {
		return model.TaskDashboard{}, err
	}

	taskDashboardModel := taskDashboardResponse.MapTaskDashboard(taskDashboard)
	return taskDashboardModel, nil
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

func (s *GroupTaskService) GetTaskTableByGroupTask(ctx context.Context, input model.IDInput) (model.TaskTable, error) {
	taskTable, err := client.IGroupTaskAdapter(&adapter.GroupTaskAdapter{}).GetTaskTableByGroupTask(input.ID)
	if err != nil {
		return model.TaskTable{}, err
	}

	return taskTableResponse.MapTaskTable(taskTable), nil
}