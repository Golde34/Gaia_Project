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