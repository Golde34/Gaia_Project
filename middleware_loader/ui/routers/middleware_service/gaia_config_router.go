package routers

import (
	"middleware_loader/core/port/store"
	services "middleware_loader/core/services/middleware_loader"
	database_mongo "middleware_loader/kernel/database/mongo"
	controller_services "middleware_loader/ui/controller_services/middleware_loader"
	"net/http"

	"github.com/go-chi/chi"
)

type GaiaConfigurationRouter struct {
	GaiaConfigDB database_mongo.Database
}

func NewGaiaConfigurationRouter(db database_mongo.Database, r *chi.Mux) *GaiaConfigurationRouter {
	gaiaConfigurationStore := store.NewGaiaConfigurationStore(db)
	gaiaConfigurationService := services.NewGaiaConfigurationService(gaiaConfigurationStore)
	r.Route("/gaia-configuration", func(r chi.Router) {
		r.Get("/get-by-type/{paramType}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetAllGaiaConfiguration(w, r, gaiaConfigurationService)
		})
	})
	return &GaiaConfigurationRouter{
		GaiaConfigDB: db,
	}
}