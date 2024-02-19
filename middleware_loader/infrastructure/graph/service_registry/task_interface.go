package service_registry

import (
	"context"

	"middleware_loader/infrastructure/graph/model"
)

type TaskService interface {
	ListAllTasks(ctx context.Context) ([]model.Task, error)
	GetTaskById(ctx context.Context, id string) (model.Task, error)
	CreateTask(ctx context.Context, input model.CreateTaskInput) (model.Task, error)
	UpdateTask(ctx context.Context, input model.UpdateTaskInput) (model.Task, error)
	DeleteTask(ctx context.Context, input model.IDInput) (model.Task, error)
	// GetSubTasksByTaskId(ctx context.Context, id string) ([]model.SubTask, error)
	// GetCommentsByTaskId(ctx context.Context, id string) ([]model.Comment, error)
	GenerateTaskWithoutGroupTask(ctx context.Context, input model.GenerateTaskWithoutGroupTaskInput) (model.Task, error)
	UpdateTaskInDialog(ctx context.Context, input model.UpdateTaskInDialogInput) (model.Task, error)
	MoveTask(ctx context.Context, input model.MoveTaskInput) (model.Task, error)
	ArchiveTask(ctx context.Context, input model.IDInput) (model.Task, error)
	EnableTask(ctx context.Context, input model.IDInput) (model.Task, error)
}