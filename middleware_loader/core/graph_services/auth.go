package graph_services

import (
	"context"
	"fmt"

	"middleware_loader/core/domain/enums"
)

type AuthService interface {
	Signin(ctx context.Context, input SigninInput) (string, error)
}

type SigninInput struct {
	Username string
	Password string
}

func (in SigninInput) Validate() error {
	if len(in.Password) < 1 {
		return fmt.Errorf("%w: password is required", enums.ErrValidation)
	}

	return nil
}
