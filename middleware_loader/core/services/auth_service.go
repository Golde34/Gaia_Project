package services

import (
	"context"
	"encoding/json"
	"log"

	"middleware_loader/core/domain/dtos"
	"middleware_loader/core/domain/enums"
	"middleware_loader/core/services/base"
	"middleware_loader/core/validator"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/configs"
)

type AuthService struct {
	SigninInput dtos.AuthDTO
}

func NewAuthService() *AuthService {
	return &AuthService{}
}

var authValidator = validator.NewAuthDTOValidator()
var authEnv, _ = configs.LoadEnv()

func (s *AuthService) Signin(ctx context.Context, input model.SigninInput) (model.AuthTokenResponse, error) {
	err := authValidator.AuthValidate(input)
	if err != nil {
		return model.AuthTokenResponse{}, err
	}	
	log.Println("Validation passed!")

	authToken, err := s.CallAuthService(input)
	if (err != nil) {
		return model.AuthTokenResponse{}, err
	}

	if authToken.Role == enums.Boss {
		gaiaHealth, err := s.CallGaiaService(authToken)
		if err != nil {
			authToken.GaiaHealth = "Gaia health check not good"
		} else {
			authToken.GaiaHealth = gaiaHealth
		}
	}

	if authToken.BossType == enums.ClientConnected {
		return authToken, nil
	} else {
		return model.AuthTokenResponse{}, nil
	}
}

func (s *AuthService) CallAuthService(input model.SigninInput) (model.AuthTokenResponse, error) {
	authServiceURL := authEnv.Url + authEnv.AuthServicePort + "/auth/sign-in"

	bodyResult, err := base.BaseAPI(authServiceURL, "POST", input)
	if err != nil {
		return model.AuthTokenResponse{}, err
	}
	dataBytes, err := base.ConvertResponseToMap(bodyResult)

	var authToken model.AuthTokenResponse
	err = json.Unmarshal(dataBytes, &authToken)
	if err != nil {
		return model.AuthTokenResponse{}, err
	}
	return authToken, nil
}

func (s *AuthService) CallGaiaService(model model.AuthTokenResponse) (string, error) {
	gaiaServiceURL := authEnv.Url + authEnv.GaiaPort + "/middleware/health-check"

	bodyResult, err := base.BaseAPI(gaiaServiceURL, "GET", model)
	if err != nil {
		return "Cannot call the API", err
	}
	
	bodyResultStr, ok := bodyResult.(string)
	if !ok {
		return "Cannot convert the response to string", err
	}

	return bodyResultStr, nil
}

func (s *AuthService) GaiaAutoSignin(ctx context.Context, input model.SigninInput) (model.AuthTokenResponse, error) {
	err := authValidator.AuthValidate(input)
	if err != nil {
		return model.AuthTokenResponse{}, err
	}
	log.Println("Validation passed!")

	authServiceURL := authEnv.Url + authEnv.AuthServicePort + "/auth/gaia-auto-sign-in"

	bodyResult, err := base.BaseAPI(authServiceURL, "POST", input)
	if err != nil {
		return model.AuthTokenResponse{}, err
	}

	// Convert the response body to a map
	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	// Unmarshal the response body into an AuthToken
	var authToken model.AuthTokenResponse
	err = json.Unmarshal(dataBytes, &authToken)
	if err != nil {
		return model.AuthTokenResponse{}, err
	}
	
	if authToken.BossType == enums.GaiaConnected {
		return authToken, nil
	} else {
		return model.AuthTokenResponse{}, nil
	}
} 