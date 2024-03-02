package controller_services

import (
	"encoding/json"
	mapper "middleware_loader/core/port/mapper/request"
	services "middleware_loader/core/services/repo_service"
	"net/http"
)

func GetURLPermission(w http.ResponseWriter, r *http.Request, urlPermissionService *services.URLPermissionService) {
	var body map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var input = mapper.UrlPermissionConfigurationDTOMapper(body)
	err := urlPermissionService.GetURLPermission(input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}