package services

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"middleware_loader/core/services/base"
	"middleware_loader/core/validator"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/configs"
)

type AuthService struct {
	SigninInput model.SigninInput
}

func NewAuthService() *AuthService {
	return &AuthService{}
}

var authValidator = validator.NewAuthDTOValidator()
var env, _ = configs.LoadEnv()

func (s *AuthService) Signin(ctx context.Context, input model.SigninInput) (model.AuthTokenResponse, error) {
	err := authValidator.AuthValidate(input)
	// if err != nil {	
	// 	return base.ErrorReturnBlock("validation step", err)
	// }
	log.Println("Validation passed!")

	authServiceURL := env.Url + env.AuthServicePort + "/auth/sign-in"

	bodyResult, err := base.BaseAPI(authServiceURL, "POST", input)
	if err != nil {
		return model.AuthTokenResponse{}, err
	}

	body, ok := bodyResult.([]byte)
	if !ok {
		return model.AuthTokenResponse{}, fmt.Errorf("baseAPI did not return a byte slice")
	}

	// Unmarshal the response body into an AuthToken
	var authToken model.AuthTokenResponse
	err = json.Unmarshal(body, &authToken)
	if err != nil {
		return model.AuthTokenResponse{}, err
	}

	return authToken, nil
}