package routers

import (
	services "middleware_loader/core/services/repo_service"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)

type URLPermissionRouter struct {
	URLPermissionService *services.URLPermissionService
}

func NewURLPermissionRouter(urlPermssion *services.URLPermissionService, r *chi.Mux) *URLPermissionRouter {
	r.Route("/auth-filter", func(r chi.Router) {
		r.Get("/get-url-permission", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetURLPermission(w, r, urlPermssion)
		})
	})
	return &URLPermissionRouter{
		URLPermissionService: urlPermssion,
	}
}
