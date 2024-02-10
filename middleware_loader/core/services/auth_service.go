package services

import (
	"context"
	"log"

	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/validator"
	"middleware_loader/infrastructure/adapter"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/configs"
)

type AuthService struct {
	SigninInput request_dtos.AuthDTO
}

func NewAuthService() *AuthService {
	return &AuthService{}
}

var authValidator = validator.NewAuthDTOValidator()
var authConfig = configs.Config{}
var authEnv, _ = authConfig.LoadEnv()

func (s *AuthService) Signin(ctx context.Context, input model.SigninInput) (model.AuthTokenResponse, error) {
	err := authValidator.AuthValidate(input)
	if err != nil {
		return model.AuthTokenResponse{}, err
	}	
	log.Println("Validation passed!")

	authTokenResponse, err := adapter.NewAuthAdapter().Signin(input)
	if err != nil {
		return model.AuthTokenResponse{}, err
	} else {
		authTokenResponse := response_dtos.NewSigninResponseDTO().MapperToGraphQLModel(authTokenResponse)
		return authTokenResponse, nil
	}	
}

func (s *AuthService) GaiaAutoSignin(ctx context.Context, input model.SigninInput) (model.AuthTokenResponse, error) {
	err := authValidator.AuthValidate(input)
	if err != nil {
		return model.AuthTokenResponse{}, err
	}
	log.Println("Validation passed!")

	authTokenResponse, err := adapter.NewAuthAdapter().GaiaAutoSignin(input) 
	if err != nil {
		return model.AuthTokenResponse{}, err
	} else {
		authTokenResponse := response_dtos.NewSigninResponseDTO().MapperToGraphQLModel(authTokenResponse)
		return authTokenResponse, nil
	}	
} 