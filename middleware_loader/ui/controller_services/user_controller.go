package controller_services

import (
	"middleware_loader/core/domain/dtos/base"
	mapper "middleware_loader/core/port/mapper/request"
	"middleware_loader/core/services"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"
)

func GetAllUsers(w http.ResponseWriter, r *http.Request, userService *services.UserService) {
	
	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "listAllUsers", QueryInput: nil, QueryOutput: model.ListAllUsers{}})
	graphqlQuery := utils.GenerateGraphQLMultipleFunctionNoInput("query", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

// func GetByUsername(w http.ResponseWriter, r *http.Request, userService *services.UserService) {
// 	var body map[string]interface{}
// 	body, err := controller_utils.MappingBody(w, r)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}

// 	input := mapper.UserDTOMapper(body)
// 	graphQuery := utils.GenerateGraphQLQueryWithInput("query", "getUserByUsername", model.UserInput{Username: username}, model.User{})
// 	utils.ConnectToGraphQLServer(w, graphQuery)
// }

func UpdateUser(w http.ResponseWriter, r *http.Request, userService *services.UserService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	input := mapper.UpdateUserRequestDTOMapper(body)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "updateUser", QueryInput: input, QueryOutput: model.User{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}