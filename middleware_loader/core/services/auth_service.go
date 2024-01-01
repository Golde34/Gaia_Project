package services

import (
	"context"
	"log"

	"middleware_loader/core/validator"
	"middleware_loader/infrastructure/graph/model"
)

type AuthService struct {
	SigninInput model.SigninInput
}

func NewAuthService() *AuthService {
	return &AuthService{}
}

var authValidator = validator.NewAuthDTOValidator()

func (s *AuthService) Signin(ctx context.Context, input model.SigninInput) (model.AuthToken, error) {
	err := authValidator.AuthValidate(input)
	if err != nil {
		log.Println(err)
		return model.AuthToken{}, err
	}
	log.Println("Validation passed!")



	return model.AuthToken{}, err
}