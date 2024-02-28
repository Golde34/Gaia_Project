package routers

import (
	services "middleware_loader/core/services/repo_service"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)


type MiddlewareRouter struct {
	MiddlewareService *services.MicroserviceStatusService
}

func NewMiddlewareRouter(middlewareService *services.MicroserviceStatusService, r *chi.Mux) *MiddlewareRouter {
	r.Route("/middleware", func(r chi.Router) {
		r.Get("/microservice-status", func(w http.ResponseWriter, r *http.Request) {
			controller_services.MicroservicesStatus(w, r, middlewareService)
		})
		r.Post("/insert-microservice-configuration", func(w http.ResponseWriter, r *http.Request) {
			controller_services.InsertMicroserviceConfiguration(w, r, middlewareService)
		})
	})
	return &MiddlewareRouter{
		MiddlewareService: middlewareService,
	}
}