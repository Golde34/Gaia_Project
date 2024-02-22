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

func ListAllTasks(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	graphqlQueryModel := []models.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "listAllTasks", QueryInput: nil, QueryOutput: model.Task{}})
	graphqlQuery := utils.GenerateGraphQLMultipleFunctionNoInput("query", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

func GetTaskById(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	taskId := chi.URLParam(r, "id")
	input := mapper.GetTaskId(taskId)

	graphqlQueryModel := []models.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "getTaskById", QueryInput: input, QueryOutput: model.Task{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("query", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
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
	taskId := chi.URLParam(r, "id")
	input := mapper.GetTaskId(taskId)

	graphqlQueryModel := []models.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "deleteTask", QueryInput: input, QueryOutput: model.Task{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

func GetSubTasksByTaskId(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	log.Println("GetSubTasksByTaskId")
}

func GetCommentsByTaskId(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	log.Println("GetCommentsByTaskId")
}

func GenerateTaskWithoutGroupTask(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	input := mapper.GenerateTaskRequestDTOMapper(body)

	graphqlQueryModel := []models.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "generateTaskWithoutGroupTask", QueryInput: input, QueryOutput: model.Task{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

func UpdateTaskInDialog(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	taskId := chi.URLParam(r, "id")

	input := mapper.UpdateTaskInDialogRequestDTOMapper(body, taskId)

	graphqlQueryModel := []models.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "updateTaskInDialog", QueryInput: input, QueryOutput: model.Task{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

func MoveTask(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	taskId := chi.URLParam(r, "id")

	input := mapper.MoveTaskRequestDTOMapper(body, taskId)

	graphqlQueryModel := []models.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "moveTask", QueryInput: input, QueryOutput: model.Task{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

func ArchiveTask(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	taskId := chi.URLParam(r, "id")
	input := mapper.GetTaskId(taskId)

	graphqlQueryModel := []models.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "archiveTask", QueryInput: input, QueryOutput: model.Task{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

func Enable(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	taskId := chi.URLParam(r, "id")
	input := mapper.GetTaskId(taskId)

	graphqlQueryModel := []models.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "enableTask", QueryInput: input, QueryOutput: model.Task{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}