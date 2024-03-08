package routers

import (
	"middleware_loader/core/services"
	"middleware_loader/core/store"
	database_mongo "middleware_loader/kernel/database/mongo"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)

type MicroserviceRouter struct {
	MicroserviceConfigurationDB database_mongo.Database
}

func NewMicroserviceRouter(db database_mongo.Database, r *chi.Mux) *MicroserviceRouter {
	microserviceConfigurationStore := store.NewMicroserviceConfigurationStore(db)
	microserviceConfigurationService := services.NewMicroserviceConfigurationService(microserviceConfigurationStore)
	r.Route("/microservice", func(r chi.Router) {
			r.Get("/status", func(w http.ResponseWriter, r *http.Request) {
				controller_services.CheckMicroservice(w, r, microserviceConfigurationService)
			})
			r.Get("/get-service", func(w http.ResponseWriter, r *http.Request) {
				controller_services.GetMicroservice(w, r, microserviceConfigurationService)
			})
			r.Post("/insert-microservice-configuration", func(w http.ResponseWriter, r *http.Request) {
				controller_services.InsertMicroserviceConfiguration(w, r, microserviceConfigurationService)
			})
		})
	return &MicroserviceRouter{
		MicroserviceConfigurationDB: db,
	}
}
