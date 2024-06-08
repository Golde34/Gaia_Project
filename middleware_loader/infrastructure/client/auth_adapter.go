package client_adapter

import (
	"encoding/json"

	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/domain/enums"
	"middleware_loader/infrastructure/client/base"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
)

type AuthAdapter struct {
	adapter *AuthAdapter
}

func NewAuthAdapter(adapter *AuthAdapter) *AuthAdapter {
	return &AuthAdapter{adapter: adapter}
}

func (adapter *AuthAdapter) Signin(input model.SigninInput) (response_dtos.AuthTokenResponseDTO, error) {
	authToken, err := adapter.callSigninAuthService(input)
	if err != nil {
		return response_dtos.AuthTokenResponseDTO{}, err
	}

	if authToken.Role == enums.Boss {
		gaiaHealth, err := adapter.callHealthCheckGaiaService(authToken)
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

func (adapter *AuthAdapter) callSigninAuthService(input model.SigninInput) (response_dtos.AuthTokenResponseDTO, error) {
	authServiceURL := base.AuthServiceURL + "/auth/sign-in"

	bodyResult, err := utils.BaseAPI(authServiceURL, "POST", input)
	if err != nil {
		return response_dtos.AuthTokenResponseDTO{}, err
	}
	dataBytes, err := utils.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.AuthTokenResponseDTO{}, err
	}

	var authToken response_dtos.AuthTokenResponseDTO
	err = json.Unmarshal(dataBytes, &authToken)
	if err != nil {
		return response_dtos.AuthTokenResponseDTO{}, err
	}
	return authToken, nil
}

func (adapter *AuthAdapter) callHealthCheckGaiaService(model response_dtos.AuthTokenResponseDTO) (string, error) {
	gaiaServiceURL := base.GaiaServiceURL + "/middleware/health-check"

	bodyResult, err := utils.BaseAPI(gaiaServiceURL, "GET", model)
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
	authServiceURL := base.AuthServiceURL + "/auth/gaia-auto-sign-in"

	bodyResult, err := utils.BaseAPI(authServiceURL, "POST", input)
	if err != nil {
		return response_dtos.AuthTokenResponseDTO{}, err
	}
	
	dataBytes, err := utils.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.AuthTokenResponseDTO{}, err
	}
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

func (adapter *AuthAdapter) CheckToken(input model.TokenInput) (model.TokenResponse, error) {
	authServiceURL := base.AuthServiceURL + "/auth/check-token"

	bodyResult, err := utils.BaseAPI(authServiceURL, "POST", input)
	if err != nil {
		return model.TokenResponse{}, err
	}

	dataBytes, err := utils.ConvertResponseToMap(bodyResult)
	if err != nil {
		return model.TokenResponse{}, err
	}
	var tokenResponse model.TokenResponse
	err = json.Unmarshal(dataBytes, &tokenResponse)
	if err != nil {
		return model.TokenResponse{}, err
	}

	return tokenResponse, nil
}
