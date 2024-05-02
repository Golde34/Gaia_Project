package service_registry

import (
	"context"
	"middleware_loader/infrastructure/graph/model"
)

type RoleService interface {
	GetAllRoles(ctx context.Context) ([]model.Role, error)
}