package services

import (
	"context"
	"encoding/json"
	"log"

	"middleware_loader/core/domain/enums"
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
var authEnv, _ = configs.LoadEnv()

func (s *AuthService) Signin(ctx context.Context, input model.SigninInput) (model.AuthTokenResponse, error) {
	err := authValidator.AuthValidate(input)
	if err != nil {
		return model.AuthTokenResponse{}, err
	}	
	log.Println("Validation passed!")

	authToken, err := s.CallAuthService(input)
	// trong auth token hien gio dang chua cac thong tin accessToken, refreshToken, name, username, email, connectedType, role can check role co dung la boss role khong
	
	// vtrue := true
	// if (!vtrue) { // tam thoi thay the cho viec check boss role
	// 	s.CallGaiaService(input) // kich hoat Gaia Connector 
	// 	// neu gaia khong hoat dong tra ra health check not good
	// 	// neu gaia hoat dong tra ra health check good
	// }

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

func (s *AuthService) CallGaiaService(input model.SigninInput) (model.AuthTokenResponse, error) {
	gaiaServiceURL := authEnv.Url + authEnv.GaiaPort + "/gaia/health-check"

	bodyResult, err := base.BaseAPI(gaiaServiceURL, "GET", input)
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