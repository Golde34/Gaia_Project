package controller_services

import (
	"log"
	base_dtos "middleware_loader/core/domain/dtos/base"
	mapper "middleware_loader/core/port/mapper/request"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"
)

func RegisterTaskConfig(w http.ResponseWriter, r *http.Request) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	log.Println(body)
	input := mapper.RegisterTaskConfigRequestDTOMapper(body)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "registerTaskConfig", QueryInput: input, QueryOutput: model.RegisterTaskConfig{}})
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "isTaskExisted", QueryInput: input, QueryOutput: model.IsTaskExisted{}})
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "isScheduleExisted", QueryInput: input, QueryOutput: model.IsScheduleExisted{}})
	log.Println("GraphQL Query: ", graphqlQueryModel)
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}