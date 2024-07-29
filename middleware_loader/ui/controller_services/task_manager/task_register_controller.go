package controller_services

import (
	base_dtos "middleware_loader/core/domain/dtos/base"
	mapper "middleware_loader/core/port/mapper/request"
	services "middleware_loader/core/services/task_manager"
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
	userIdInput := mapper.GetUserIdInBody(body)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "registerTaskConfig", QueryInput: registerTaskInput, QueryOutput: model.RegisterTaskConfig{}})
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "isTaskExisted", QueryInput: userIdInput, QueryOutput: model.IsTaskExisted{}})
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "isScheduleExisted", QueryInput: userIdInput, QueryOutput: model.IsScheduleExisted{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func QueryTaskConfig(w http.ResponseWriter, r *http.Request, taskRegisterService * services.TaskRegisterService) {
	userId := chi.URLParam(r, "userId")	
	input := mapper.GetUserId(userId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "queryTaskConfig", QueryInput: input, QueryOutput: model.IsTaskConfigExisted{}})
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "isTaskExisted", QueryInput: input, QueryOutput: model.IsTaskExisted{}})
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "isScheduleExisted", QueryInput: input, QueryOutput: model.IsScheduleExisted{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}