package controller_services

import (
	"log"
	base_dtos "middleware_loader/core/domain/dtos/base"
	mapper "middleware_loader/core/port/mapper/request"
	services "middleware_loader/core/services/task_manager"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"

	"github.com/go-chi/chi"
)

func GetGroupTaskById(w http.ResponseWriter, r *http.Request, groupTaskService *services.GroupTaskService) {
	groupTaskId := chi.URLParam(r, "id")
	input := mapper.GetId(groupTaskId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "getGroupTaskById", QueryInput: input, QueryOutput: model.GroupTask{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("query", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func CreateGroupTask(w http.ResponseWriter, r *http.Request, groupTaskService *services.GroupTaskService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	log.Println(body)
	input := mapper.CreateGroupTaskRequestDTOMapper(body)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "createGroupTask", QueryInput: input, QueryOutput: model.GroupTask{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func UpdateGroupTask(w http.ResponseWriter, r *http.Request, groupTaskService *services.GroupTaskService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	groupTaskId := chi.URLParam(r, "id")
	input := mapper.UpdateGroupTaskRequestDTOMapper(body, groupTaskId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "updateGroupTask", QueryInput: input, QueryOutput: model.GroupTask{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func DeleteGroupTask(w http.ResponseWriter, r *http.Request, groupTaskService *services.GroupTaskService) {
	groupTaskId := chi.URLParam(r, "id")
	input := mapper.GetId(groupTaskId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "deleteGroupTask", QueryInput: input, QueryOutput: model.GroupTask{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func GetTasksByGroupTask(w http.ResponseWriter, r *http.Request, groupTaskService *services.GroupTaskService) {
	groupTaskId := chi.URLParam(r, "id")
	input := mapper.GetId(groupTaskId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "getTasksByGroupTaskId", QueryInput: input, QueryOutput: model.TaskDashboard{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("query", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func UpdateGroupTaskName(w http.ResponseWriter, r *http.Request, groupTaskService *services.GroupTaskService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	groupTaskId := chi.URLParam(r, "id")

	input := mapper.UpdateGroupTaskNameRequestDTOMapper(body, groupTaskId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "updateGroupTaskName", QueryInput: input, QueryOutput: model.GroupTask{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func CalculateCompletedTasks(w http.ResponseWriter, r *http.Request, groupTaskService *services.GroupTaskService) {
	groupTaskId := chi.URLParam(r, "id")
	input := mapper.GetId(groupTaskId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "calculateCompletedTasks", QueryInput: input, QueryOutput: model.GroupTask{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func UpdateGroupTaskOrdinal(w http.ResponseWriter, r *http.Request, groupTaskService *services.GroupTaskService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	groupTaskId := chi.URLParam(r, "id")
	input := mapper.GetProjectGroupTaskId(body, groupTaskId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "updateOrdinalNumber", QueryInput: input, QueryOutput: model.GroupTask{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func ArchiveGroupTask(w http.ResponseWriter, r *http.Request, groupTaskService *services.GroupTaskService) {
	groupTaskId := chi.URLParam(r, "id")
	input := mapper.GetId(groupTaskId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "archieveGroupTask", QueryInput: input, QueryOutput: model.GroupTask{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func EnableGroupTask(w http.ResponseWriter, r *http.Request, groupTaskService *services.GroupTaskService) {
	groupTaskId := chi.URLParam(r, "id")
	input := mapper.GetId(groupTaskId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "enableGroupTask", QueryInput: input, QueryOutput: model.GroupTask{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}
