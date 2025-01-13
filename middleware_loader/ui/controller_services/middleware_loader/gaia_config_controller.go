package controller_services

import (
	"encoding/json"
	services "middleware_loader/core/services/middleware_loader"
	"net/http"

	"github.com/go-chi/chi"
)

func GetAllGaiaConfiguration(w http.ResponseWriter, r *http.Request, gaiaConfigurationService *services.GaiaConfigurationService) {
	paramType := chi.URLParam(r, "paramType")
	gaiaConfigurations, err := gaiaConfigurationService.GetAllGaiaConfiguration(paramType)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	response, err := json.Marshal(gaiaConfigurations)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}