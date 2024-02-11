package services

import (
	"context"
	"log"
	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/validator"
	"middleware_loader/infrastructure/adapter"
	"middleware_loader/infrastructure/graph/model"
)

type ProjectService struct {
	CreateProjectRequestDTO request_dtos.CreateProjectRequestDTO
}

func NewProjectService() *ProjectService {
	return &ProjectService{}
}

var projectValidation = validator.NewProjectDTOValidator()
var projectAdapter = adapter.NewProjectAdapter()
var projectResponse = response_dtos.NewCreateProjectResponseDTO()

func (s *ProjectService) CreateProject(ctx context.Context, input model.CreateProjectInput) (model.Project, error) {
	err := projectValidation.CreateProjectValidate(input)
	if err != nil {
		return model.Project{}, err
	}
	log.Println("Validation passed!")

	project, err := projectAdapter.CreateProject(input)
	if err != nil {
		return model.Project{}, err
	} else {
		projectModel := projectResponse.MapperToGraphQLModel(project)
		return projectModel, nil
	}
}