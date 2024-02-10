package adapter

import (
	"encoding/json"
	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/domain/enums"
	"middleware_loader/infrastructure/adapter/base"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/configs"
)

type AuthAdapter struct {
	SigninInput request_dtos.AuthDTO
}

func NewAuthAdapter() *AuthAdapter {
	return &AuthAdapter{}
}

var authConfig = configs.Config{}
var authEnv, _ = authConfig.LoadEnv()
var authServiceURL = authEnv.Url + authEnv.AuthServicePort
var gaiaServiceURL = authEnv.Url + authEnv.GaiaPort

func (adapter *AuthAdapter) Signin(input model.SigninInput) (response_dtos.AuthTokenResponseDTO, error) {
	authToken, err := adapter.CallAuthService(input)
	if err != nil {
		return response_dtos.AuthTokenResponseDTO{}, err
	}

	if authToken.Role == enums.Boss {
		gaiaHealth, err := adapter.CallGaiaService(authToken)
		if err != nil {
			authToken.GaiaHealth = "Gaia health check not good"
		} else {
			authToken.GaiaHealth = gaiaHealth
		}
	}

	if authToken.BossType == enums.ClientConnected {
		return authToken, nil
	} else {
		return response_dtos.AuthTokenResponseDTO{}, nil
	}
}

func (adapter *AuthAdapter) CallAuthService(input model.SigninInput) (response_dtos.AuthTokenResponseDTO, error) {
	authServiceURL := authServiceURL + "/auth/sign-in"

	bodyResult, err := base.BaseAPI(authServiceURL, "POST", input)
	if err != nil {
		return response_dtos.AuthTokenResponseDTO{}, err
	}
	dataBytes, err := base.ConvertResponseToMap(bodyResult)

	var authToken response_dtos.AuthTokenResponseDTO
	err = json.Unmarshal(dataBytes, &authToken)
	if err != nil {
		return response_dtos.AuthTokenResponseDTO{}, err
	}
	return authToken, nil
}

func (adapter *AuthAdapter) CallGaiaService(model response_dtos.AuthTokenResponseDTO) (string, error) {
	gaiaServiceURL := gaiaServiceURL + "/middleware/health-check"

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

func (adapter *AuthAdapter) GaiaAutoSignin(input model.SigninInput) (response_dtos.AuthTokenResponseDTO, error) {
	authServiceURL := authServiceURL + "/auth/gaia-auto-sign-in"

	bodyResult, err := base.BaseAPI(authServiceURL, "POST", input)
	if err != nil {
		return response_dtos.AuthTokenResponseDTO{}, err
	}
	dataBytes, err := base.ConvertResponseToMap(bodyResult)

	var authToken response_dtos.AuthTokenResponseDTO
	err = json.Unmarshal(dataBytes, &authToken)
	if err != nil {
		return response_dtos.AuthTokenResponseDTO{}, err
	}

	if authToken.BossType == enums.GaiaConnected {
		return authToken, nil
	} else {
		return response_dtos.AuthTokenResponseDTO{}, nil
	}

}
