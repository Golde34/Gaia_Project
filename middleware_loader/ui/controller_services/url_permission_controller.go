package controller_services

import (
	"encoding/json"
	mapper "middleware_loader/core/port/mapper/request"
	"middleware_loader/core/services/middleware_loader"
	"net/http"
)

func GetURLPermission(w http.ResponseWriter, r *http.Request, urlPermissionService *services.URLPermissionService) {
	var body map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var input = mapper.UrlPermissionRequestDTOMapper(body)
	result := urlPermissionService.GetURLPermission(input)
	dataBytes, err := json.Marshal(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(dataBytes)
}