package controller_services

import (
	"encoding/json"
	"log"
	"middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/services"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"net/http"
)

func CreateTask(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	var body map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	log.Println(body)
	var input = taskService.CreateTaskInput
	input = request.CreateTaskRequestDTOMapper(body)
	log.Println(input)
	query := utils.GenerateGraphQLQueryWithInput("mutation", "createTask", input, model.Task{})
	utils.ConnectToGraphQLServer(w, query)
}