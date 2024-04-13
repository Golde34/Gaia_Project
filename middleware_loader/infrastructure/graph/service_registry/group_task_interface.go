package service_registry

import (
	"context"
	"middleware_loader/infrastructure/graph/model"
)

type GroupTaskService interface {
	GetGroupTaskById(ctx context.Context, input model.IDInput) (model.GroupTask, error)
	CreateGroupTask(ctx context.Context, input model.CreateGroupTaskInput) (model.GroupTask, error)
	UpdateGroupTask(ctx context.Context, input model.UpdateGroupTaskInput) (model.GroupTask, error)
	DeleteGroupTask(ctx context.Context, input model.IDInput) (model.GroupTask, error)
	GetTasksInGroupTask(ctx context.Context, input model.IDInput) ([]model.Task, error)
	UpdateGroupTaskName(ctx context.Context, input model.UpdateObjectNameInput) (model.GroupTask, error)
	CalculateCompletedTasks(ctx context.Context, input model.IDInput) (model.GroupTask, error)
	UpdateGroupTaskOrdinal(ctx context.Context, input model.ProjectGroupTaskIDInput) (model.GroupTask, error)
	ArchiveGroupTask(ctx context.Context, input model.IDInput) (model.GroupTask, error)
	EnableGroupTask(ctx context.Context, input model.IDInput) (model.GroupTask, error)
}