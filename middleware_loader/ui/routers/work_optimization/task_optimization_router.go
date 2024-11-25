package routers

import (
	services "middleware_loader/core/services/work_optimization"
	database_mongo "middleware_loader/kernel/database/mongo"
	controller_services "middleware_loader/ui/controller_services/work_optimization"
	"net/http"

	"github.com/go-chi/chi"
)

type TaskOptimizationRouter struct {
	TaskOptimizationService *services.TaskOptimizationService
}

func NewTaskOptimizationRouter(taskOptimizationService *services.TaskOptimizationService, db database_mongo.Database, r *chi.Mux) *TaskOptimizationRouter {
	r.Route("/task-optimization", func(r chi.Router) {
		// r.Use(middleware.CheckMicroserviceStatus(db, enums.WORK_OPTIMIZATION))
		r.Post("/optimize-task-by-user", func(w http.ResponseWriter, r *http.Request) {
			controller_services.OptimizeTaskByUser(w, r, taskOptimizationService)
		})
	})
	return &TaskOptimizationRouter{
		TaskOptimizationService: taskOptimizationService,
	}
}