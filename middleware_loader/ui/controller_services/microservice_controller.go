package controller_services

import (
	"encoding/json"
	mapper "middleware_loader/core/port/mapper/request"
	"middleware_loader/core/services"
	"middleware_loader/core/services/base"
	"net/http"
)

func CheckMicroservice(w http.ResponseWriter, r *http.Request, miccroserviceConfigService *services.MicroserviceConfigurationService) {
	var body map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	
	var input = mapper.GetMicroserviceRequestDTOMapper(body)
	result, err := miccroserviceConfigService.CheckMicroserviceStatus(input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	dataBytes, err := json.Marshal(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(dataBytes)
}

func GetAllMicroservices(w http.ResponseWriter, r *http.Request, miccroserviceConfigService *services.MicroserviceConfigurationService) {
	result, err := miccroserviceConfigService.GetAllMicroservices()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := base.ReturnSuccessResponse("Get all microservices successfully", result)

	dataBytes, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(dataBytes)
}

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

	var input = mapper.InsertMicroserviceConfigurationRequestDTOMapper(body)
	result := miccroserviceConfigService.InsertMicroservice(input)
	dataBytes, err := json.Marshal(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Write(dataBytes)
}

