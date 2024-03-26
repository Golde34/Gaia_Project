package routers

import (
	"middleware_loader/core/services"
	"middleware_loader/core/port/store"
	database_mongo "middleware_loader/kernel/database/mongo"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)

type URLPermissionRouter struct {
	UrlPermissionConfiguration database_mongo.Database	
}

func NewURLPermissionRouter(db database_mongo.Database, r *chi.Mux) *URLPermissionRouter {
	urlPermissionConfigurationStore := store.NewUrlPermissionConfigurationStore(db)
	urlPermissionConfigurationService := services.NewUrlPermissionService(urlPermissionConfigurationStore)
	r.Route("/auth-filter", func(r chi.Router) {
		r.Get("/get-url-permission", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetURLPermission(w, r, urlPermissionConfigurationService)
		})
	})
	return &URLPermissionRouter{
		UrlPermissionConfiguration: db,
	}
}
