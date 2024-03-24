package service_registry

import (
	"context"
	"middleware_loader/infrastructure/graph/model"
)

type UserService interface {
	ListAllUsers(ctx context.Context) ([]model.User, error)
}