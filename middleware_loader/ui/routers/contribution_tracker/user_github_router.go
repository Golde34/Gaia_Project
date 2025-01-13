package routers

import (
	"middleware_loader/core/port/store"
	services "middleware_loader/core/services/contribution_tracker"
	database_mongo "middleware_loader/kernel/database/mongo"
	controller_services "middleware_loader/ui/controller_services/contribution_tracker"
	"net/http"

	"github.com/go-chi/chi"
)

type UserGithubRouter struct {
	UserGithubService *services.UserGithubService
}

func NewUserGithubRouter(db database_mongo.Database, r *chi.Mux) *UserGithubRouter {
	gaiaConfigurationStore := store.NewGaiaConfigurationStore(db)
	userGithubService := services.NewUserGithubService(gaiaConfigurationStore)
	r.Route("/user-commit", func(r chi.Router) {
		r.Get("/user-github/{userId}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetUserGithubInfo(w, r, userGithubService)
		})
	})
	return &UserGithubRouter{
		UserGithubService: userGithubService,
	}
}