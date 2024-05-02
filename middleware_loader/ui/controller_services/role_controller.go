package controller_services

import (
	base_dtos "middleware_loader/core/domain/dtos/base"
	services "middleware_loader/core/services/auth_services"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"net/http"
)

func GetAllRoles(w http.ResponseWriter, r *http.Request, roleService *services.RoleService) {
	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "getAllRoles", QueryInput: nil, QueryOutput: model.Role{}})
	graphqlQuery := utils.GenerateGraphQLMultipleFunctionNoInput("query", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}