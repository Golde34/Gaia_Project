package controller_services

import (
	"encoding/json"
	mapper "middleware_loader/core/port/mapper/request"
	services "middleware_loader/core/services/repo_service"
	"net/http"
)

func MicroservicesStatus(w http.ResponseWriter, r *http.Request, middlewareService *services.MicroserviceStatusService) {
	var body map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	
	var input = mapper.MicroserviceStatusRequestDTOMapper(body)
	err := middlewareService.GetMicroserviceStatus(input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}