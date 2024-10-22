package client

import (
	converter_dtos "middleware_loader/core/domain/dtos/converter"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/graph/model"
)

type IGroupTaskAdapter interface {
	GetGroupTaskById(id string) (response_dtos.GroupTaskResponseDTO, error)
	CreateGroupTask(input model.CreateGroupTaskInput) (response_dtos.GroupTaskResponseDTO, error)
	UpdateGroupTask(input model.UpdateGroupTaskInput, id string) (response_dtos.GroupTaskResponseDTO, error)
	DeleteGroupTask(id string) (response_dtos.GroupTaskResponseDTO, error)
	GetTasksByGroupTask(id string) (response_dtos.TaskDashboardResponseDTO, error)
	UpdateGroupTaskName(input converter_dtos.UpdateNameConverterDTO, id string) (response_dtos.GroupTaskResponseDTO, error)
	CalculateCompletedTasks(id string) (response_dtos.GroupTaskResponseDTO, error)
	UpdateGroupTaskOrdinal(input model.ProjectGroupTaskIDInput, id string) (response_dtos.GroupTaskResponseDTO, error)
	ArchiveGroupTask(id string) (response_dtos.GroupTaskResponseDTO, error)
	EnableGroupTask(id string) (response_dtos.GroupTaskResponseDTO, error)
	GetTaskTableByGroupTask(id string) (response_dtos.TaskTableResponseDTO, error)
}
