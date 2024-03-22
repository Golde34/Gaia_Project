package routers

import (
	"middleware_loader/core/domain/enums"
	"middleware_loader/core/middleware"
	"middleware_loader/core/services"
	database_mongo "middleware_loader/kernel/database/mongo"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)

type TaskRouter struct {
	TaskService *services.TaskService
}

func NewTaskRouter(taskService *services.TaskService, db database_mongo.Database, r *chi.Mux) *TaskRouter {
	r.Route("/task", func(r chi.Router) {
		r.Use(middleware.CheckMicroserviceStatus(db, enums.TASK_MANAGER))
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			controller_services.ListAllTasks(w, r, taskService)
		})
		r.Get("/{id}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetTaskById(w, r, taskService)
		})
		r.Post("/create", func(w http.ResponseWriter, r *http.Request) {
			controller_services.CreateTask(w, r, taskService)
		})
		r.Put("/{id}/update", func(w http.ResponseWriter, r *http.Request) {
			controller_services.UpdateTask(w, r, taskService)
		})
		r.Delete("/{id}/delete", func(w http.ResponseWriter, r *http.Request) {
			controller_services.DeleteTask(w, r, taskService)
		})
		r.Get("/{id}/sub-tasks", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetSubTasksByTaskId(w, r, taskService)
		})
		r.Get("/{id}/comments", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetCommentsByTaskId(w, r, taskService)
		})
		r.Post("/generate", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GenerateTaskWithoutGroupTask(w, r, taskService)
		})
		r.Put("/update-task-in-dialog/{id}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.UpdateTaskInDialog(w, r, taskService)
		})
		r.Put("/{id}/move-task", func(w http.ResponseWriter, r *http.Request) {
			controller_services.MoveTask(w, r, taskService)
		})
		r.Put("/{id}/archive", func(w http.ResponseWriter, r *http.Request) {
			controller_services.ArchiveTask(w, r, taskService)
		})
		r.Put("/{id}/enable", func(w http.ResponseWriter, r *http.Request) {
			controller_services.Enable(w, r, taskService)
		})
	})
	return &TaskRouter{
		TaskService: taskService,
	}
}
