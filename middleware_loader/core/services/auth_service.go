package services

import (
	"context"
	"log"
	"middleware_loader/core/graph_services"
)

type AuthService struct {
	SigninInput graph_services.SigninInput
}

func NewAuthService() *AuthService {
	return &AuthService{}
}

func (s *AuthService) Signin(ctx context.Context, input graph_services.SigninInput) (string, error) {
	log.Printf("Signin: %v", input)
	return "", nil
}