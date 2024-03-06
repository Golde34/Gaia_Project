package controller_services

import (
	"encoding/json"
	mapper "middleware_loader/core/port/mapper/request"
	"middleware_loader/core/services"
	"net/http"
)

func GetMicroservice(w http.ResponseWriter, r *http.Request, miccroserviceConfigService *services.MicroserviceConfigurationService) {
	var body map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	
	var input = mapper.MicroserviceConfigurationRequestDTOMapper(body)
	err := miccroserviceConfigService.GetMicroservice(input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func InsertMicroserviceConfiguration(w http.ResponseWriter, r *http.Request, miccroserviceConfigService *services.MicroserviceConfigurationService) {
	var body map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var input = mapper.MicroserviceConfigurationRequestDTOMapper(body)
	result := miccroserviceConfigService.InsertMicroservice(input)
	dataBytes, err := json.Marshal(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Write(dataBytes)
}