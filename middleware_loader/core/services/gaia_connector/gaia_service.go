package services

import (
	"encoding/json"
	"log"

	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/client/base"
	"middleware_loader/infrastructure/graph/model"
)

type GaiaService struct {}

func NewGaiaService() *GaiaService {
	return &GaiaService{}
}


func (s *GaiaService) GaiaConnect() (interface{}, error) {
	log.Println("GaiaConnect")
	gaiaURL := base.GaiaServiceURL + "/middleware/gaia-connect"
	
	bodyResult, err := base.BaseAPI(gaiaURL, "GET", nil)
	if err != nil {
		return "", err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return "", err
	}
	var authToken model.AuthTokenResponse
	err = json.Unmarshal(dataBytes, &authToken)
	if err != nil {
		return "", err
	}
	
	return response_dtos.GaiaTokenResponse{
		AccessToken: authToken.AccessToken,
		RefreshToken: authToken.RefreshToken,
	}, nil
}
