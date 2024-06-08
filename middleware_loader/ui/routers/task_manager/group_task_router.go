package routers

import (
	"middleware_loader/core/domain/enums"
	"middleware_loader/core/middleware"
	services "middleware_loader/core/services/task_manager"
	database_mongo "middleware_loader/kernel/database/mongo"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)

type GroupTaskRouter struct {
	GroupTaskService *services.GroupTaskService
}

func NewGroupTaskRouter(groupTaskService *services.GroupTaskService, db database_mongo.Database, r *chi.Mux) *GroupTaskRouter {
	r.Route("/group-task", func(r chi.Router) {
		r.Use(middleware.CheckMicroserviceStatus(db, enums.TASK_MANAGER))
		r.Get("/{id}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetGroupTaskById(w, r, groupTaskService)
		})
		r.Post("/create", func(w http.ResponseWriter, r *http.Request) {
			controller_services.CreateGroupTask(w, r, groupTaskService)
		})
		r.Put("/{id}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.UpdateGroupTask(w, r, groupTaskService)
		})
		r.Delete("/{id}", func(w http.ResponseWriter, r *http.Request) {
			controller_services.DeleteGroupTask(w, r, groupTaskService)
		})
		r.Get("/{id}/tasks", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetTasksByGroupTask(w, r, groupTaskService)
		})
		r.Put("/{id}/update-name", func(w http.ResponseWriter, r *http.Request) {
			controller_services.UpdateGroupTaskName(w, r, groupTaskService)
		})
		r.Get("/{id}/tasks-complete", func(w http.ResponseWriter, r *http.Request) {
			controller_services.CalculateCompletedTasks(w, r, groupTaskService)
		})
		r.Put("/{id}/update-ordinal", func(w http.ResponseWriter, r *http.Request) {
			controller_services.UpdateGroupTaskOrdinal(w, r, groupTaskService)
		})
		r.Put("/{id}/archive", func(w http.ResponseWriter, r *http.Request) {
			controller_services.ArchiveGroupTask(w, r, groupTaskService)
		})
		r.Put("/{id}/enable", func(w http.ResponseWriter, r *http.Request) {
			controller_services.EnableGroupTask(w, r, groupTaskService)
		})
	})
	return &GroupTaskRouter{
		GroupTaskService: groupTaskService,
	}
}
