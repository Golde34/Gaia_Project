package controller_services

import (
	services "middleware_loader/core/services/repo_service"
	"net/http"
)

func MicroservicesStatus(w http.ResponseWriter, r *http.Request, middlewareService *services.MicroserviceStatusService) {
	middlewareService.GetMicroserviceStatus()
}