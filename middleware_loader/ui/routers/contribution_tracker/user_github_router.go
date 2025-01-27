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
	r.Route("/user-commit", func(r chi.Router) {
		r.Get("/user-github/{userId}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetUserGithubInfo(w, r, userGithubService)
		})
		r.Post("/user-github/authorize", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GithubAuthorize(w, r, userGithubService)
		})
		r.Get("/synchronize-user-github/{userId}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.SynchronizeUserGithub(w, r, userGithubService)
		})
		r.Get("/user-github/get-project-repo/{userId}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetProjectsAndRepos(w, r, userGithubService)
		})
	})
	r.Route("/project-commit", func(r chi.Router) {
		r.Post("/sync-project-repo", func(w http.ResponseWriter, r *http.Request) {
			controller_services.SyncProjectRepo(w, r, userGithubService)
		})
	})
	return &UserGithubRouter{
		UserGithubService: userGithubService,
	}
}