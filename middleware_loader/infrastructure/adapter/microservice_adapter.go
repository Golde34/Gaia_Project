package adapter

import (
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

func (adapter *MicroserviceAdapter) GetMicroserviceByName(microserviceName string) (models.ErrorResponse, error) {
	microserviceUrl := getMicroserviceUrlByName(microserviceName)
	microserviceUrl = microserviceUrl + "/status"

	bodyResult, err := base.FullResponseBaseAPI(microserviceUrl, "GET", nil)
	if err != nil {
		return models.ErrorResponse{}, err
	}
	
	var microserviceStatus models.ErrorResponse
	if errResp, ok := bodyResult.(models.ErrorResponse); ok {
		microserviceStatus = errResp
	} else {
		return models.ErrorResponse{}, err
	}
	return microserviceStatus, nil
}

func getMicroserviceUrlByName(microserviceName string) string {
	switch microserviceName {
	case enums.AUTH_SERVICE:
		return base.AuthServiceURL + "/auth"
	case enums.GAIA_SERVICE:
		return base.GaiaServiceURL + "/middleware"
	case enums.TASK_MANAGER:
		return base.TaskManagerServiceURL
	default:
		return ""
	}
}
