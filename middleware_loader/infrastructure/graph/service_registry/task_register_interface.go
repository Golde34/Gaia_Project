package service_registry

import (
	"context"
	"middleware_loader/infrastructure/graph/model"
)

type TaskRegistryService interface {
	RegisterTaskConfig(ctx context.Context, input model.RegisterTaskInput) (model.RegisterTaskConfig, error)
	IsTaskExisted(ctx context.Context, input model.UserIDInput) (model.IsTaskExisted, error)
	IsScheduleExisted(ctx context.Context, input model.UserIDInput) (model.IsScheduleExisted, error)
	QueryTaskConfig(ctx context.Context, input model.UserIDInput) (model.IsTaskConfigExisted, error)
}