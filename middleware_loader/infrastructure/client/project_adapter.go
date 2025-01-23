package client_adapter

import (
	"encoding/json"
	"fmt"

	converter_dtos "middleware_loader/core/domain/dtos/converter"
	response_dtos "middleware_loader/core/domain/dtos/response"
	mapper_response "middleware_loader/core/port/mapper/response"
	"middleware_loader/infrastructure/client/base"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
)

type ProjectAdapter struct {
	adapter *ProjectAdapter
}

func NewProjectAdapter(adapter *ProjectAdapter) *ProjectAdapter {
	return &ProjectAdapter{adapter: adapter}
}

func (adapter *ProjectAdapter) ListAll() ([]response_dtos.ProjectResponseDTO, error) {
	listAllProjectURL := base.TaskManagerServiceURL + "/project/all"
	return adapter.listAll(listAllProjectURL)
}

func (adapter *ProjectAdapter) ListAllByUserID(userId string) ([]response_dtos.ProjectResponseDTO, error) {
	listAllProjectByUserIDURL := base.TaskManagerServiceURL + "/project/all/" + userId
	return adapter.listAll(listAllProjectByUserIDURL)
}

func (adapter *ProjectAdapter) listAll(url string) ([]response_dtos.ProjectResponseDTO, error) {
	var projects []response_dtos.ProjectResponseDTO
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.BaseAPI(url, "GET", nil, headers)
	if err != nil {
		return []response_dtos.ProjectResponseDTO{}, err
	}

	bodyResultMap, ok := bodyResult.(map[string]interface{})
	if !ok {
		return []response_dtos.ProjectResponseDTO{}, fmt.Errorf("unexpected response format")
	}
	for _, projectElement := range bodyResultMap["projects"].([]interface{}) {
		project := mapper_response.ReturnProjectObjectMapper(projectElement.(map[string]interface{}))
		projects = append(projects, *project)
	}

	return projects, nil
}

func (adapter *ProjectAdapter) GetById(id string) (response_dtos.ProjectResponseDTO, error) {
	getProjectByIdURL := base.TaskManagerServiceURL + "/project/" + id
	var project response_dtos.ProjectResponseDTO
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.BaseAPI(getProjectByIdURL, "GET", nil, headers)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := utils.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) CreateProject(input model.CreateProjectInput) (response_dtos.ProjectResponseDTO, error) {
	createPrjectURL := base.TaskManagerServiceURL + "/project/create"
	var project response_dtos.ProjectResponseDTO
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.BaseAPI(createPrjectURL, "POST", input, headers)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := utils.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) UpdateProject(input model.UpdateProjectInput, id string) (response_dtos.ProjectResponseDTO, error) {
	updateProjectURL := base.TaskManagerServiceURL + "/project/" + id
	var project response_dtos.ProjectResponseDTO
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.BaseAPI(updateProjectURL, "PUT", input, headers)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := utils.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) DeleteProject(id string) (response_dtos.ProjectResponseDTO, error) {
	deleteProjectURL := base.TaskManagerServiceURL + "/project/" + id
	var project response_dtos.ProjectResponseDTO
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.BaseAPI(deleteProjectURL, "DELETE", nil, headers)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := utils.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) GetGroupTasksInProject(id string) ([]response_dtos.GroupTaskResponseDTO, error) {
	getGroupTasksURL := base.TaskManagerServiceURL + "/project/" + id + "/group-tasks"
	var groupTasks []response_dtos.GroupTaskResponseDTO
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.BaseAPI(getGroupTasksURL, "GET", nil, headers)
	if err != nil {
		return []response_dtos.GroupTaskResponseDTO{}, err
	}

	bodyResultMap, ok := bodyResult.(map[string]interface{})
	if !ok {
		return []response_dtos.GroupTaskResponseDTO{}, fmt.Errorf("unexpected response format")
	}
	for _, groupTaskElement := range bodyResultMap["message"].([]interface{}) {
		groupTask := mapper_response.ReturnGroupTaskObjectMapper(groupTaskElement.(map[string]interface{}))
		groupTasks = append(groupTasks, *groupTask)
	}

	return groupTasks, nil
}

func (adapter *ProjectAdapter) UpdateProjectName(input converter_dtos.UpdateNameConverterDTO, id string) (response_dtos.ProjectResponseDTO, error) {
	updateNameURL := base.TaskManagerServiceURL + "/project/" + id + "/update-name"
	var project response_dtos.ProjectResponseDTO
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.BaseAPI(updateNameURL, "PUT", input, headers)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := utils.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) UpdateProjectColor(input converter_dtos.UpdateColorConverterDTO, id string) (response_dtos.ProjectResponseDTO, error) {
	updateColorURL := base.TaskManagerServiceURL + "/project/" + id + "/update-color"
	var project response_dtos.ProjectResponseDTO
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.BaseAPI(updateColorURL, "PUT", input, headers)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := utils.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) ArchiveProject(id string) (response_dtos.ProjectResponseDTO, error) {
	archiveProjectURL := base.TaskManagerServiceURL + "/project/" + id + "/archive"
	var project response_dtos.ProjectResponseDTO
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.BaseAPI(archiveProjectURL, "PUT", nil, headers)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := utils.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) EnableProject(id string) (response_dtos.ProjectResponseDTO, error) {
	enableProjectURL := base.TaskManagerServiceURL + "/project/" + id + "/enable"
	var project response_dtos.ProjectResponseDTO
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.BaseAPI(enableProjectURL, "PUT", nil, headers)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := utils.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) GetGithubRepos(userId string) ([]response_dtos.GithubRepoResponseDTO, error) {
	getGithubReposURL := base.ContributionTrackerURL + "/contribution-tracker/project-commit/get-github-repos/" + userId 
	var githubRepos []response_dtos.GithubRepoResponseDTO
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.BaseAPI(getGithubReposURL, "GET", nil, headers)
	if err != nil {
		return []response_dtos.GithubRepoResponseDTO{}, err
	}

	bodyResultMap, ok := bodyResult.(map[string]interface{})
	if !ok {
		return []response_dtos.GithubRepoResponseDTO{}, err
	}
	for _, githubRepoElement := range bodyResultMap["githubRepos"].([]interface{}) {
		githubRepo := mapper_response.ReturnGithubRepoObjectMapper(githubRepoElement.(map[string]interface{}))
		githubRepos = append(githubRepos, *githubRepo)
	}

	return githubRepos, nil 
}
