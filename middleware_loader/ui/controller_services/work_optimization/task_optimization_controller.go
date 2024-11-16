package controller_services

import (
	services "middleware_loader/core/services/work_optimization"
	"net/http"

	"github.com/go-chi/chi"
)

func OptimizeTaskByUser(w http.ResponseWriter, r *http.Request, taskOptimizationService *services.TaskOptimizationService) {
	userId := chi.URLParam(r, "userId")
	taskOptimizationService.OptimizeTaskByUser(userId)
}