package routers

import (
	services "middleware_loader/core/services/contribution_tracker"
	controller_services "middleware_loader/ui/controller_services/contribution_tracker"
	"net/http"

	"github.com/go-chi/chi"
)

type UserGithubRouter struct {
	UserGithubService *services.UserGithubService
}

func NewUserGithubRouter(userGithubService *services.UserGithubService, r *chi.Mux) *UserGithubRouter {
	r.Route("/user-github", func(r chi.Router) {
		r.Get("/{userId}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetUserGithubInfo(w, r, userGithubService)
		})
	})
	return &UserGithubRouter{
		UserGithubService: userGithubService,
	}
}