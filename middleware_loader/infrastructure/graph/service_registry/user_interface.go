package service_registry

import (
	"context"
	"middleware_loader/infrastructure/graph/model"
)

type UserService interface {
	ListAllUsers(ctx context.Context) ([]model.ListAllUsers, error)
	UpdateUser(ctx context.Context, input model.UpdateUserInput) (model.UpdateUser, error)
}