package routers

import (
	"middleware_loader/core/services"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)



type MiddlewareRouter struct {
	MiddlewareService *services.MiddlewareService
}

func NewMiddlewareRouter(middlewareService *services.MiddlewareService, r *chi.Mux) * MiddlewareRouter {
	r.Route("/middleware", func(r chi.Router) {
		r.Get("/microservice-status", func(w http.ResponseWriter, r *http.Request) {
			controller_services.MicroservicesStatus(w, r, middlewareService)
		})
	})
	return &MiddlewareRouter{
		MiddlewareService: middlewareService,
	}
}