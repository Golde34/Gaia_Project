package service_registry

import (
	"context"

	"middleware_loader/infrastructure/graph/model"
)

type TaskService interface {
	CreateTask(ctx context.Context, input model.CreateTaskInput) (model.Task, error)
}