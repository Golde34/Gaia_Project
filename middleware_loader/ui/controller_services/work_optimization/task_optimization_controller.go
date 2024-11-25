package controller_services

import (
	"encoding/json"
	"log"
	mapper "middleware_loader/core/port/mapper/request"
	services "middleware_loader/core/services/work_optimization"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"
)

func OptimizeTaskByUser(w http.ResponseWriter, r *http.Request, taskOptimizationService *services.TaskOptimizationService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	input := mapper.OptimizeTaskByUserRequestDTOMapper(body)

	result, err := taskOptimizationService.OptimizeTaskByUser(input)
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
