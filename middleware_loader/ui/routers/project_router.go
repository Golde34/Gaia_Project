package routers

import (
	"fmt"
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
		r.Get("/all", func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "All projects")
		})
		r.Get("/{id}", func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "Project by id")
		})
		r.Post("/create", func(w http.ResponseWriter, r *http.Request) {
			controller_services.CreateProject(w, r, projectService)
		})
		r.Put("/{id}", func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "Update project")
		})
		r.Delete("/{id}", func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "Delete project")
		})
		r.Get("/{id}/group-tasks", func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "All group tasks")
		})
		r.Put("/{id}/update-name", func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "Update project name")
		})
		r.Put("/{id}/update-color", func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "Update project color")
		})
		r.Put("/{id}/archieve", func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "Archieve project")
		})
		r.Put("/{id}/enable", func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "Enable project")
		})
	})
	return &ProjectRouter{
		ProjectService: projectService,
	}
}
