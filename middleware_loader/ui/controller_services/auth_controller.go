package controller_services

import (
	"encoding/json"
	mapper "middleware_loader/core/port/mapper/request"
	"middleware_loader/core/services"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"net/http"
)

func Signin(w http.ResponseWriter, r *http.Request, authService *services.AuthService) {
	var body map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// var graphQuery = models.GraphQLQuery{
	// 	Functionname: "signin",
	// 	QueryInput:   input,
	// 	QueryOutput:  model.AuthTokenResponse{},
	// }
	// multipleQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", []models.GraphQLQuery{graphQuery})

	var input = authService.SigninInput
	input = mapper.SigninRequestDTOMapper(body)

	query := utils.GenerateGraphQLQueryWithInput("mutation", "signin", input, model.AuthTokenResponse{})	
	utils.ConnectToGraphQLServer(w, query)
}

func GaiaAutoSignin(w http.ResponseWriter, r *http.Request, authService *services.AuthService) {
	var input = authService.SigninInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := utils.GenerateGraphQLQueryWithInput("mutation", "gaiaAutoSignin", input, model.AuthTokenResponse{})
	utils.ConnectToGraphQLServer(w, query)
}

func Status(w http.ResponseWriter, r *http.Request, authService *services.AuthService) {
	query := utils.GenerateGraphQLQueryNoInput("query", "status", model.User{})	
	utils.ConnectToGraphQLServer(w, query)
}