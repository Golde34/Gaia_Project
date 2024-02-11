package controller_services

import (
	"middleware_loader/core/domain/models"
	mapper "middleware_loader/core/port/mapper/request"
	"middleware_loader/core/services"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"

	"github.com/go-chi/chi"
)

func CreateTask(w http.ResponseWriter, r *http.Request, taskService *services.TaskService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	input := mapper.CreateTaskRequestDTOMapper(body)
	token := mapper.GetToken(body)
	
	graphqlQueryModel := []models.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "createTask", QueryInput: input, QueryOutput: model.Task{}})
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "checkToken", QueryInput: token, QueryOutput: model.TokenResponse{}})
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
	token := mapper.GetToken(body)
	
	graphqlQueryModel := []models.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "updateTask", QueryInput: input, QueryOutput: model.Task{}})
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "checkToken", QueryInput: token, QueryOutput: model.TokenResponse{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}