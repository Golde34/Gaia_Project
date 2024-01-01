package services

import (
	"context"
	"log"

	"middleware_loader/infrastructure/graph/model"
)

type AuthService struct {
	SigninInput model.SigninInput
}

func NewAuthService() *AuthService {
	return &AuthService{}
}

func (s *AuthService) Signin(ctx context.Context, input model.SigninInput) (model.AuthToken, error) {
	log.Printf("Signin: %v", input)
	return model.AuthToken{}, nil
}