package controller_services

import (
	"middleware_loader/core/domain/models"
	mapper "middleware_loader/core/mapper/request"
	"middleware_loader/core/services"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"
)

func CreateProject(w http.ResponseWriter, r *http.Request, projectService *services.ProjectService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	input := mapper.CreateProjectRequestDTOMapper(body)
	token := mapper.GetToken(body)

	graphqlQueryModel := []models.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "createProject", QueryInput: input, QueryOutput: model.Project{}})
	graphqlQueryModel = append(graphqlQueryModel, models.GraphQLQuery{Functionname: "checkToken", QueryInput: token, QueryOutput: model.TokenResponse{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)

}