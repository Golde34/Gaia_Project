package controller_services

import (
	"middleware_loader/core/services"
	"net/http"
)

func MicroservicesStatus(w http.ResponseWriter, r *http.Request, middlewareService *services.MiddlewareService) {
	middlewareService.MicroservicesStatus()
}