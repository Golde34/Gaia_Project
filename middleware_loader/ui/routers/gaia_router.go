package routers

import (
	"middleware_loader/core/domain/enums"
	"middleware_loader/core/middleware"
	"middleware_loader/core/services"
	database_mongo "middleware_loader/kernel/database/mongo"
	"middleware_loader/ui/controller_services"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"

	"github.com/go-chi/chi"
)


type GaiaRouter struct {
	GaiaService * services.GaiaService
}

func NewGaiaRouter(gaiaService *services.GaiaService, db database_mongo.Database, r *chi.Mux) *GaiaRouter {
	r.Route("/gaia", func (r chi.Router) {
		r.Use(middleware.CheckMicroserviceStatus(db, enums.GAIA_SERVICE))
		r.Get("/gaia-connect", func(w http.ResponseWriter, r *http.Request) {
			w = controller_utils.SetHeaders(w)
			controller_services.GaiaConnect(w, r, gaiaService)
		})
	})
	return &GaiaRouter{
		GaiaService: gaiaService,
	}
}