package service_registry

import (
	"context"

	"middleware_loader/infrastructure/graph/model"
)

type AuthService interface {
	Signin(ctx context.Context, input model.SigninInput) (model.AuthToken, error)
}