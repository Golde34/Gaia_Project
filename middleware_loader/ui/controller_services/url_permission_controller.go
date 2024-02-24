package controller_services

import (
	services "middleware_loader/core/services/repo_service"
	"net/http"
)

func GetURLPermission(w http.ResponseWriter, r *http.Request, urlPermissionService *services.URLPermissionService) {
	urlPermissionService.GetURLPermission()
}