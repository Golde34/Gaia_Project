package service_registry

import (
	"context"
	"middleware_loader/infrastructure/graph/model"
)

type PrivilegeService interface {
	GetAllPrivileges(ctx context.Context) ([]model.ListPrivilegeResponse, error)
}