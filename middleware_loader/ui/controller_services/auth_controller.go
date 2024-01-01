package controller_services

import (
	"encoding/json"
	"middleware_loader/core/services"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"net/http"
)

func Signin(w http.ResponseWriter, r *http.Request, authService *services.AuthService) {
	var input = authService.SigninInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := utils.GenerateGraphQLQueryWithInput("mutation", "signin", input, model.AuthToken{})	
	utils.ConnectToGraphQLServer(w, query)
}

func Status(w http.ResponseWriter, r *http.Request, authService *services.AuthService) {
	query := utils.GenerateGraphQLQueryNoInput("query", "status", model.User{})	
	utils.ConnectToGraphQLServer(w, query)
}