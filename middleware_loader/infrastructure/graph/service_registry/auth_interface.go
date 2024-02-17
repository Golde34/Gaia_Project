package service_registry

import (
	"context"

	"middleware_loader/infrastructure/graph/model"
)

type AuthService interface {
	Signin(ctx context.Context, input model.SigninInput) (model.AuthTokenResponse, error)
	GaiaAutoSignin(ctx context.Context, input model.SigninInput) (model.AuthTokenResponse, error)
	CheckToken(ctx context.Context, input model.TokenInput) (model.TokenResponse, error)
}