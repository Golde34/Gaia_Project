package services

import (
	"context"
	"log"

	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	port "middleware_loader/core/port/adapter_interface"
	"middleware_loader/core/validator"
	"middleware_loader/infrastructure/adapter"
	"middleware_loader/infrastructure/graph/model"
)

type AuthService struct {
	SigninInput request_dtos.AuthDTO
}

func NewAuthService() *AuthService {
	return &AuthService{}
}

var authValidator = validator.NewAuthDTOValidator()
var signinResponesDTO = response_dtos.NewSigninResponseDTO()

func (s *AuthService) Signin(ctx context.Context, input model.SigninInput) (model.AuthTokenResponse, error) {
	err := authValidator.AuthValidate(input)
	if err != nil {
		return model.AuthTokenResponse{}, err
	}	
	log.Println("Validation passed!")

	authTokenResponse , err := port.IAuthAdapter(&adapter.AuthAdapter{}).Signin(input)
	if err != nil {
		return model.AuthTokenResponse{}, err
	} else {
		authTokenResponse := signinResponesDTO.MapperToGraphQLModel(authTokenResponse)
		return authTokenResponse, nil
	}	
}

func (s *AuthService) GaiaAutoSignin(ctx context.Context, input model.SigninInput) (model.AuthTokenResponse, error) {
	err := authValidator.AuthValidate(input)
	if err != nil {
		return model.AuthTokenResponse{}, err
	}
	log.Println("Validation passed!")

	authTokenResponse , err := port.IAuthAdapter(&adapter.AuthAdapter{}).GaiaAutoSignin(input)
	if err != nil {
		return model.AuthTokenResponse{}, err
	} else {
		authTokenResponse := signinResponesDTO.MapperToGraphQLModel(authTokenResponse)
		return authTokenResponse, nil
	}	
}

func (s *AuthService) CheckToken(ctx context.Context, input model.TokenInput) (model.TokenResponse, error) {
	err := authValidator.TokenValidate(input)
	if err != nil {
		return model.TokenResponse{}, err
	}
	log.Println("Validation passed!")

	tokenResponse , err := port.IAuthAdapter(&adapter.AuthAdapter{}).CheckToken(input)
	if err != nil {
		return model.TokenResponse{}, err
	} else {
		return tokenResponse, nil
	}
}