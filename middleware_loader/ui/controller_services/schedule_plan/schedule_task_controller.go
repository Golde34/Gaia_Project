package controller_services

import (
	"encoding/json"
	"log"
	services "middleware_loader/core/services/schedule_plan"
	"net/http"

	"github.com/go-chi/chi"
)

func GetScheduleTaskListByUserId(w http.ResponseWriter, r *http.Request, scheduleTaskService *services.ScheduleTaskService) {
	userId := chi.URLParam(r, "userId")
	scheduleTaskList, err := services.NewScheduleTaskService().GetScheduleTaskListByUserId(userId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	response := map[string]interface{}{
		"scheduleTaskList": scheduleTaskList,
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}

func GetTaskBatchListByUserId(w http.ResponseWriter, r *http.Request, scheduleTaskService *services.ScheduleTaskService) {
	userId := chi.URLParam(r, "userId")
	taskBatchList, err := services.NewScheduleTaskService().GetTaskBatchListByUserId(userId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(taskBatchList); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}