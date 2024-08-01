package controller_services

import (
	base_dtos "middleware_loader/core/domain/dtos/base"
	mapper "middleware_loader/core/port/mapper/request"
	services "middleware_loader/core/services/work_optimization"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"

	"github.com/go-chi/chi"
)

func RegisterTaskConfig(w http.ResponseWriter, r *http.Request, taskRegisterService * services.TaskRegisterService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	registerTaskInput := mapper.RegisterTaskConfigRequestDTOMapper(body)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "registerTaskConfig", QueryInput: registerTaskInput, QueryOutput: model.RegisterTaskConfig{}})	
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func QueryTaskConfig(w http.ResponseWriter, r *http.Request, taskRegisterService * services.TaskRegisterService) {
	userId := chi.URLParam(r, "userId")	
	input := mapper.GetUserId(userId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "queryTaskConfig", QueryInput: input, QueryOutput: model.IsTaskConfigExisted{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}