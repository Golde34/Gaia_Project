package client_adapter

import (
	"middleware_loader/core/domain/enums"
	"middleware_loader/core/domain/dtos/base"
	"middleware_loader/infrastructure/client/base"
)

type MicroserviceAdapter struct {
	adapter *MicroserviceAdapter
}

func NewMicroserviceAdapter(adapter *MicroserviceAdapter) *MicroserviceAdapter {
	return &MicroserviceAdapter{adapter: adapter}
}

func (adapter *MicroserviceAdapter) GetMicroserviceByName(microserviceName string) (base_dtos.ErrorResponse, error) {
	microserviceUrl := getMicroserviceUrlByName(microserviceName)
	microserviceUrl = microserviceUrl + "/status"

	bodyResult, err := base.FullResponseBaseAPI(microserviceUrl, "GET", nil)
	if err != nil {
		return base_dtos.ErrorResponse{}, err
	}
	
	var microserviceStatus base_dtos.ErrorResponse
	if errResp, ok := bodyResult.(base_dtos.ErrorResponse); ok {
		microserviceStatus = errResp
	} else {
		return base_dtos.ErrorResponse{}, err
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
