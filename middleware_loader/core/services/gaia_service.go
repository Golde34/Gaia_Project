package services

import (
	"encoding/json"
	"log"

	"middleware_loader/infrastructure/adapter/base"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/configs"
)

type GaiaService struct {}

func NewGaiaService() *GaiaService {
	return &GaiaService{}
}

var config = configs.Config{}
var gaiaEnv, _ = config.LoadEnv()

func (s *GaiaService) GaiaConnect() (interface{}, error) {
	log.Println("GaiaConnect")
	gaiaURL := gaiaEnv.Url + gaiaEnv.GaiaPort + "/middleware/gaia-connect"

	bodyResult, err := base.BaseAPI(gaiaURL, "GET", nil)
	if err != nil {
		return "", err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	var authToken model.AuthTokenResponse
	err = json.Unmarshal(dataBytes, &authToken)
	if err != nil {
		return "", err
	}
	
	return TokenResponse{
		AccessToken: authToken.AccessToken,
		RefreshToken: authToken.RefreshToken,
	}, nil
}
type TokenResponse struct {
	AccessToken string `json:"accessToken"` 
	RefreshToken string `json:"refreshToken"`
}