package routers

import (
	"middleware_loader/core/domain/entity"
	services "middleware_loader/core/services/repo_service"
	"middleware_loader/infrastructure/repository"
	database_mongo "middleware_loader/kernel/database/mongo"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)

type MiddlewareRouter struct {
	MicroserviceStatusDB database_mongo.Database
}

func NewMiddlewareRouter(db database_mongo.Database, r *chi.Mux) *MiddlewareRouter {
	microserviceStatusRepository := repository.NewMicroserviceStatusRepository(db, entity.CollectionMicroserviceStatus)
	microserviceStatusService := services.NewMicroserviceStatusService(microserviceStatusRepository)
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
