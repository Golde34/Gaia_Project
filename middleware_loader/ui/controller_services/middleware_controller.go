package controller_services

import (
	"middleware_loader/core/services/graphql_service"
	"net/http"
)

func MicroservicesStatus(w http.ResponseWriter, r *http.Request, middlewareService *services.MiddlewareService) {
	middlewareService.MicroservicesStatus()
}