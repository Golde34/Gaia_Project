package routers

import (
	services "middleware_loader/core/services/repo_service"
	"middleware_loader/core/store"
	database_mongo "middleware_loader/kernel/database/mongo"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)

type MiddlewareRouter struct {
	MicroserviceStatusDB database_mongo.Database
}

func NewMiddlewareRouter(db database_mongo.Database, r *chi.Mux) *MiddlewareRouter {
	microserviceStatusStore := store.NewMicroserviceStatusStore(db)
	microserviceStatusService := services.NewMicroserviceStatusService(microserviceStatusStore)
	r.Route("/middleware", func(r chi.Router) {
			r.Get("/microservice-status", func(w http.ResponseWriter, r *http.Request) {
				controller_services.MicroservicesStatus(w, r, microserviceStatusService)
			})
			r.Post("/insert-microservice-configuration", func(w http.ResponseWriter, r *http.Request) {
				controller_services.InsertMicroserviceConfiguration(w, r, microserviceStatusService)
			})
		})
	return &MiddlewareRouter{
		MicroserviceStatusDB: db,
	}
}
