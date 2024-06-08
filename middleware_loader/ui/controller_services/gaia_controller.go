package controller_services

import (
	"encoding/json"
	"middleware_loader/core/services/gaia_connector"
	"net/http"
)

func GaiaConnect(w http.ResponseWriter, r *http.Request, gaiaService *services.GaiaService) {
	result, err := gaiaService.GaiaConnect()
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