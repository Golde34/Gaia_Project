package adapter

import (
	"encoding/json"
	"middleware_loader/core/domain/enums"
	"middleware_loader/core/domain/models"
	"middleware_loader/infrastructure/adapter/base"
)

type MicroserviceAdapter struct {
	adapter *MicroserviceAdapter
}

func NewMicroserviceAdapter(adapter *MicroserviceAdapter) *MicroserviceAdapter {
	return &MicroserviceAdapter{adapter: adapter}
}

func (adapter *MicroserviceAdapter) GetMicroserviceByName(microserviceName string) (interface{}, error) {
	microserviceUrl := getMicroserviceUrlByName(microserviceName)
	microserviceUrl = microserviceUrl + "/status"

	bodyResult, err := base.BaseAPI(microserviceUrl, "GET", nil)
	if err != nil {
		return models.ErrorResponse{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return models.ErrorResponse{}, err
	}

	var microserviceStatus models.ErrorResponse
	err = json.Unmarshal(dataBytes, &microserviceStatus)
	if err != nil {
		return models.ErrorResponse{}, err
	}

	return microserviceStatus, nil
}

func getMicroserviceUrlByName(microserviceName string) string {
	switch microserviceName {
	case enums.AUTH_SERVICE:
		return base.AuthServiceURL + "/auth"
	case enums.GAIA_SERVICE:
		return base.GaiaServiceURL + "/gaia"
	case enums.TASK_MANAGER:
		return base.TaskManagerServiceURL
	default:
		return ""
	}
}