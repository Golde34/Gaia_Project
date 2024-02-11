package adapter

import (
	"encoding/json"
	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/adapter/base"
	"middleware_loader/infrastructure/graph/model"
)

type ProjectAdapter struct {
	CreateProjectRequestDTO request_dtos.CreateProjectRequestDTO
}

func NewProjectAdapter() *ProjectAdapter {
	return &ProjectAdapter{}
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