package service_registry

import (
	"context"
	"middleware_loader/infrastructure/graph/model"
)

type ProjectService interface {
	CreateProject(ctx context.Context, input model.CreateProjectInput) (model.Project, error)
}