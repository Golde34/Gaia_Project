package controller_services

import (
	"middleware_loader/core/domain/dtos/base"
	mapper "middleware_loader/core/port/mapper/request"
	"middleware_loader/core/services/task_manager"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"

	"github.com/go-chi/chi"
)

func ListAll(w http.ResponseWriter, r *http.Request, projectService *services.ProjectService) {

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "listAllProjects", QueryInput: nil, QueryOutput: model.Project{}})
	graphqlQuery := utils.GenerateGraphQLMultipleFunctionNoInput("query", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
	
}

func GetById(w http.ResponseWriter, r *http.Request, projectService *services.ProjectService) {
	projectId := chi.URLParam(r, "id")
	input := mapper.GetProjectId(projectId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "getProjectById", QueryInput: input, QueryOutput: model.Project{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("query", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

func CreateProject(w http.ResponseWriter, r *http.Request, projectService *services.ProjectService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	input := mapper.CreateProjectRequestDTOMapper(body)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "createProject", QueryInput: input, QueryOutput: model.Project{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)

}

func UpdateProject(w http.ResponseWriter, r *http.Request, projectService *services.ProjectService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	projectId := chi.URLParam(r, "id")

	input := mapper.UpdateProjectRequestDTOMapper(body, projectId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "updateProject", QueryInput: input, QueryOutput: model.Project{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

func DeleteProject(w http.ResponseWriter, r *http.Request, projectService *services.ProjectService) {
	projectId := chi.URLParam(r, "id")
	input := mapper.GetProjectId(projectId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "deleteProject", QueryInput: input, QueryOutput: model.Project{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

// func GetAllGroupTasks(w http.ResponseWriter, r *http.Request, projectService *services.ProjectService) {
// 	var body map[string]interface{}
// 	body, err := controller_utils.MappingBody(w, r)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}

// 	input := mapper.GetProjectId(body)
// 	token := mapper.GetToken(body)

// 	graphqlQueryModel := []base_dtos.GraphQLQuery{}
// 	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "getAllGroupTasks", QueryInput: input, QueryOutput: model.GroupTask{}})
// 	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "checkToken", QueryInput: token, QueryOutput: model.TokenResponse{}})
// 	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("query", graphqlQueryModel)

// 	utils.ConnectToGraphQLServer(w, graphqlQuery)
// }

func UpdateProjectName(w http.ResponseWriter, r *http.Request, projectService *services.ProjectService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	projectId := chi.URLParam(r, "id")
	input := mapper.UpdateProjectNameRequestDTOMapper(body, projectId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "updateProjectName", QueryInput: input, QueryOutput: model.Project{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

func UpdateProjectColor(w http.ResponseWriter, r *http.Request, projectService *services.ProjectService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	projectId := chi.URLParam(r, "id")
	input := mapper.UpdateProjectColorRequestDTOMapper(body, projectId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "updateProjectColor", QueryInput: input, QueryOutput: model.Project{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

func ArchiveProject(w http.ResponseWriter, r *http.Request, projectService *services.ProjectService) {
	projectId := chi.URLParam(r, "id")
	input := mapper.GetProjectId(projectId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "archiveProject", QueryInput: input, QueryOutput: model.Project{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}

func EnableProject(w http.ResponseWriter, r *http.Request, projectService *services.ProjectService) {
	projectId := chi.URLParam(r, "id")
	input := mapper.GetProjectId(projectId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{Functionname: "enableProject", QueryInput: input, QueryOutput: model.Project{}})
	graphqlQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphqlQuery)
}