package controller_services

import (
	base_dtos "middleware_loader/core/domain/dtos/base"
	services "middleware_loader/core/services/auth_services"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"net/http"
)

func GetAllPrivileges(w http.ResponseWriter, r *http.Request, privilegeService *services.PrivilegeService) {
	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "getAllPrivileges", QueryInput: nil, QueryOutput: model.Privilege{}})
	graphqlQuery := utils.GenerateGraphQLMultipleFunctionNoInput("query", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}