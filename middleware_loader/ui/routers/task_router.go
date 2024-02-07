package routers

import (
	"middleware_loader/core/services"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)


type TaskRouter struct {
	TaskService *services.TaskService
}

func NewTaskRouter(taskService *services.TaskService, r *chi.Mux) *TaskRouter {
	r.Route("/task", func(r chi.Router) {
		r.Post("/create", func(w http.ResponseWriter, r *http.Request) {
			controller_services.CreateTask(w, r, taskService)
		})
	})
	return &TaskRouter{
		TaskService: taskService,
	}
}