package routers

import (
	// "middleware_loader/core/domain/enums"
	// "middleware_loader/core/middleware"
	database_mongo "middleware_loader/kernel/database/mongo"
	controller_services "middleware_loader/ui/controller_services/task_manager"
	"net/http"

	"github.com/go-chi/chi"
)

type TaskRegisterRouter struct {
}

func NewWorkOptimizationRouter(db database_mongo.Database, r *chi.Mux) *TaskRegisterRouter {
	r.Route("/work-optimization", func(r chi.Router) {
		// r.Use(middleware.CheckMicroserviceStatus(db, enums.WORK_OPTIMIZATION))	
		r.Post("/register-task-config", func(w http.ResponseWriter, r *http.Request) {
			controller_services.RegisterTaskConfig(w, r)
		})
		
	})
	return &TaskRegisterRouter{
	}
}