package routers

import (
	"middleware_loader/core/services"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)

type ProjectRouter struct {
	ProjectService *services.ProjectService
}

func NewProjectRouter(projectService *services.ProjectService, r *chi.Mux) *ProjectRouter {
	r.Route("/project", func(r chi.Router) {
		r.Post("/create", func(w http.ResponseWriter, r *http.Request) {
			controller_services.CreateProject(w, r, projectService)
		})
	})
	return &ProjectRouter{
		ProjectService: projectService,
	}
}
