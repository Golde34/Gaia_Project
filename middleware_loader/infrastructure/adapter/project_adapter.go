package adapter

import (
	"encoding/json"

	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/adapter/base"
	"middleware_loader/infrastructure/graph/model"
)

type ProjectAdapter struct {
	adapter *ProjectAdapter
}

func NewProjectAdapter(adapter *ProjectAdapter) *ProjectAdapter {
	return &ProjectAdapter{adapter: adapter}
}

func (adapter *ProjectAdapter) ListAll() ([]response_dtos.ProjectResponseDTO, error) {
	listAllProjectURL := base.TaskManagerServiceURL + "/project/all"
	var projects []response_dtos.ProjectResponseDTO

	bodyResult, err := base.BaseAPI(listAllProjectURL, "GET", nil)
	if err != nil {
		return nil, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	err = json.Unmarshal(dataBytes, &projects)
	if err != nil {
		return nil, err
	}

	return projects, nil
}

func (adapter *ProjectAdapter) GetById(id string) (response_dtos.ProjectResponseDTO, error) {
	getProjectByIdURL := base.TaskManagerServiceURL + "/project/" + id
	var project response_dtos.ProjectResponseDTO

	bodyResult, err := base.BaseAPI(getProjectByIdURL, "GET", nil)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) CreateProject(input model.CreateProjectInput) (response_dtos.ProjectResponseDTO, error) {
	createPrjectURL := base.TaskManagerServiceURL + "/project/create"
	var project response_dtos.ProjectResponseDTO

	bodyResult, err := base.BaseAPI(createPrjectURL, "POST", input)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) UpdateProject(input model.UpdateProjectInput, id string) (response_dtos.ProjectResponseDTO, error) {
	updateProjectURL := base.TaskManagerServiceURL + "/project/" + id
	var project response_dtos.ProjectResponseDTO

	bodyResult, err := base.BaseAPI(updateProjectURL, "PUT", input)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) DeleteProject(id string) (response_dtos.ProjectResponseDTO, error) {
	deleteProjectURL := base.TaskManagerServiceURL + "/project/" + id
	var project response_dtos.ProjectResponseDTO

	bodyResult, err := base.BaseAPI(deleteProjectURL, "DELETE", nil)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

// func (adapter *ProjectAdapter) GetGroupTasks(id string) ([]response_dtos.TaskResponseDTO, error) {
// 	getGroupTasksURL := base.TaskManagerServiceURL + "/project/" + id + "/tasks"
// 	var tasks []response_dtos.TaskResponseDTO

// 	bodyResult, err := base.BaseAPI(getGroupTasksURL, "GET", nil)
// 	if err != nil {
// 		return nil, err
// 	}

// 	dataBytes, err := base.ConvertResponseToMap(bodyResult)
// 	err = json.Unmarshal(dataBytes, &tasks)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return tasks, nil
// }

func (adapter *ProjectAdapter) UpdateProjectName(input model.UpdateObjectNameInput, id string) (response_dtos.ProjectResponseDTO, error) {
	updateNameURL := base.TaskManagerServiceURL + "/project/" + id + "/name"
	var project response_dtos.ProjectResponseDTO

	bodyResult, err := base.BaseAPI(updateNameURL, "PUT", input)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) UpdateProjectColor(input model.UpdateColorInput, id string) (response_dtos.ProjectResponseDTO, error) {
	updateColorURL := base.TaskManagerServiceURL + "/project/" + id + "/color"
	var project response_dtos.ProjectResponseDTO

	bodyResult, err := base.BaseAPI(updateColorURL, "PUT", input)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) ArchieveProject(id string) (response_dtos.ProjectResponseDTO, error) {
	archieveProjectURL := base.TaskManagerServiceURL + "/project/" + id + "/archive"
	var project response_dtos.ProjectResponseDTO

	bodyResult, err := base.BaseAPI(archieveProjectURL, "PUT", nil)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}

func (adapter *ProjectAdapter) EnableProject(id string) (response_dtos.ProjectResponseDTO, error) {
	enableProjectURL := base.TaskManagerServiceURL + "/project/" + id + "/enable"
	var project response_dtos.ProjectResponseDTO

	bodyResult, err := base.BaseAPI(enableProjectURL, "PUT", nil)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	err = json.Unmarshal(dataBytes, &project)
	if err != nil {
		return response_dtos.ProjectResponseDTO{}, err
	}

	return project, nil
}
