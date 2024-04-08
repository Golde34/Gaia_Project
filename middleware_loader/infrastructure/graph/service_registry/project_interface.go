package service_registry

import (
	"context"
	"middleware_loader/infrastructure/graph/model"
)

type ProjectService interface {
	ListAll(ctx context.Context) ([]model.Project, error)
	GetById(ctx context.Context, id string) (model.Project, error)
	CreateProject(ctx context.Context, input model.CreateProjectInput) (model.Project, error)
	UpdateProject(ctx context.Context, input model.UpdateProjectInput) (model.Project, error)
	DeleteProject(ctx context.Context, input model.IDInput) (model.Project, error)
	UpdateProjectName(ctx context.Context, input model.UpdateObjectNameInput) (model.Project, error)
	UpdateProjectColor(ctx context.Context, input model.UpdateColorInput) (model.Project, error)
	ArchiveProject(ctx context.Context, input model.IDInput) (model.Project, error)
	EnableProject(ctx context.Context, input model.IDInput) (model.Project, error)
	GetGroupTasksInProject(ctx context.Context, id string) ([]model.GroupTask, error)
}