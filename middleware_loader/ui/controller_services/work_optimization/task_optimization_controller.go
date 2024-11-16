package controller_services

import (
	"encoding/json"
	"log"
	services "middleware_loader/core/services/work_optimization"
	"net/http"

	"github.com/go-chi/chi"
)

func OptimizeTaskByUser(w http.ResponseWriter, r *http.Request, taskOptimizationService *services.TaskOptimizationService) {
	userId := chi.URLParam(r, "userId")
	result, err := taskOptimizationService.OptimizeTaskByUser(userId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(result); err != nil {
		log.Printf("Error encoding final response: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
