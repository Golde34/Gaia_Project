package controller_services

import (
	"log"
	"middleware_loader/core/domain/models"
	mapper "middleware_loader/core/port/mapper/request"
	"middleware_loader/core/services"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"

	"github.com/go-chi/chi"
)

func GetAllTasks(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	log.Println("GetAllTasks")
}

func GetTaskById(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	log.Println("GetTaskById")
}

func CreateTask(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	input := mapper.CreateTaskRequestDTOMapper(body)
	
	graphqlQueryModel := []models.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "createTask", QueryInput: input, QueryOutput: model.Task{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	// query := utils.GenerateGraphQLQueryWithInput("mutation", "createTask", input, model.Task{})
	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

func UpdateTask(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	taskId := chi.URLParam(r, "id")

	input := mapper.UpdateTaskRequestDTOMapper(body, taskId)
	
	graphqlQueryModel := []models.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "updateTask", QueryInput: input, QueryOutput: model.Task{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func DeleteTask(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	log.Println("DeleteTask")
}

func GetSubTasksByTaskId(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	log.Println("GetSubTasksByTaskId")
}

func GetCommentsByTaskId(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	log.Println("GetCommentsByTaskId")
}

func GenerateTaskWithoutGroupTask(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	log.Println("GenerateTaskWithoutGroupTask")
}

func UpdateTaskInDialog(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	log.Println("UpdateTaskInDialog")
}

func MoveTask(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	log.Println("MoveTask")
}

func ArchiveTask(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	log.Println("ArchiveTask")
}

func Enable(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	log.Println("Enable")
}