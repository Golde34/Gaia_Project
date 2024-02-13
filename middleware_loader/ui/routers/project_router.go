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
		r.Get("/all", func(w http.ResponseWriter, r *http.Request) {
			controller_services.ListAll(w, r, projectService)
		})
		r.Get("/{id}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetById(w, r, projectService)
		})
		r.Post("/create", func(w http.ResponseWriter, r *http.Request) {
			controller_services.CreateProject(w, r, projectService)
		})
		r.Put("/{id}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.UpdateProject(w, r, projectService)
		})
		r.Delete("/{id}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.DeleteProject(w, r, projectService)
		})
		// r.Get("/{id}/group-tasks", func(w http.ResponseWriter, r *http.Request) {
		// 	controller_services.GetGroupTasks(w, r, projectService)
		// })
		r.Put("/{id}/update-name", func(w http.ResponseWriter, r *http.Request) {
			controller_services.UpdateProjectName(w, r, projectService)
		})
		r.Put("/{id}/update-color", func(w http.ResponseWriter, r *http.Request) {
			controller_services.UpdateProjectColor(w, r, projectService)
		})
		r.Put("/{id}/archieve", func(w http.ResponseWriter, r *http.Request) {
			controller_services.ArchieveProject(w, r, projectService)
		})
		r.Put("/{id}/enable", func(w http.ResponseWriter, r *http.Request) {
			controller_services.EnableProject(w, r, projectService)
		})
	})
	return &ProjectRouter{
		ProjectService: projectService,
	}
}
