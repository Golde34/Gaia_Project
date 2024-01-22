package routers

import (
	"middleware_loader/core/services"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)


type GaiaRouter struct {
	GaiaService * services.GaiaService
}

func NewGaiaRouter(gaiaService *services.GaiaService, r *chi.Mux) *GaiaRouter {
	r.Route("/gaia", func (r chi.Router) {
		r.Get("/gaia-connect", func(w http.ResponseWriter, r *http.Request) {
			w = controller_services.SetHeaders(w)
			controller_services.GaiaConnect(w, r, gaiaService)
		})
	})
	return &GaiaRouter{
		GaiaService: gaiaService,
	}
}