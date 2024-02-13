package services

import (
	"context"
	"log"
	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	port "middleware_loader/core/port/adapter_interface"
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
var projectResponse = response_dtos.NewCreateProjectResponseDTO()

func (s *ProjectService) ListAll(ctx context.Context) ([]model.Project, error) {
	projects, err := port.IProjectAdapter(&adapter.ProjectAdapter{}).ListAll()
	if err != nil {
		return nil, err
	}
	projectsModel := projectResponse.MapperListToGraphQLModel(projects)
	return projectsModel, nil
}

func (s *ProjectService) GetById(ctx context.Context, id string) (model.Project, error) {
	project, err := port.IProjectAdapter(&adapter.ProjectAdapter{}).GetById(id)
	if err != nil {
		return model.Project{}, err
	} else {
		projectModel := projectResponse.MapperToGraphQLModel(project)
		return projectModel, nil
	}
}

func (s *ProjectService) CreateProject(ctx context.Context, input model.CreateProjectInput) (model.Project, error) {
	err := projectValidation.CreateProjectValidate(input)
	if err != nil {
		return model.Project{}, err
	}
	log.Println("Validation passed!")

	project, err := port.IProjectAdapter(&adapter.ProjectAdapter{}).CreateProject(input)
	if err != nil {
		return model.Project{}, err
	} else {
		projectModel := projectResponse.MapperToGraphQLModel(project)
		return projectModel, nil
	}
}

func (s *ProjectService) UpdateProject(ctx context.Context, input model.UpdateProjectInput) (model.Project, error) {
	err := projectValidation.UpdateProjectValidate(input)
	if err != nil {
		return model.Project{}, err
	}
	log.Println("Validation passed!")

	projectId := input.ProjectID
	project, err := port.IProjectAdapter(&adapter.ProjectAdapter{}).UpdateProject(input, projectId)
	if err != nil {
		return model.Project{}, err
	} else {
		projectModel := projectResponse.MapperToGraphQLModel(project)
		return projectModel, nil
	}	
}

func (s *ProjectService) DeleteProject(ctx context.Context, input model.IDInput) (model.Project, error) {
	project, err := port.IProjectAdapter(&adapter.ProjectAdapter{}).DeleteProject(input.ID)
	if err != nil {
		return model.Project{}, err
	} else {
		projectModel := projectResponse.MapperToGraphQLModel(project)
		return projectModel, nil
	}
}

func (s *ProjectService) UpdateProjectName(ctx context.Context, input model.UpdateObjectNameInput) (model.Project, error) {
	err := projectValidation.UpdateProjectNameValidate(input)
	if err != nil {
		return model.Project{}, err
	}
	log.Println("Validation passed!")

	projectId := input.ID
	project, err := port.IProjectAdapter(&adapter.ProjectAdapter{}).UpdateProjectName(input, projectId)
	if err != nil {
		return model.Project{}, err
	} else {
		projectModel := projectResponse.MapperToGraphQLModel(project)
		return projectModel, nil
	}
}

func (s *ProjectService) UpdateProjectColor(ctx context.Context, input model.UpdateColorInput) (model.Project, error) {
	err := projectValidation.UpdateProjectColorValidate(input)
	if err != nil {
		return model.Project{}, err
	}
	log.Println("Validation passed!")

	projectId := input.ID
	project, err := port.IProjectAdapter(&adapter.ProjectAdapter{}).UpdateProjectColor(input, projectId)
	if err != nil {
		return model.Project{}, err
	} else {
		projectModel := projectResponse.MapperToGraphQLModel(project)
		return projectModel, nil
	}
}

func (s *ProjectService) ArchieveProject(ctx context.Context, input model.IDInput) (model.Project, error) {
	project, err := port.IProjectAdapter(&adapter.ProjectAdapter{}).ArchieveProject(input.ID)
	if err != nil {
		return model.Project{}, err
	} else {
		projectModel := projectResponse.MapperToGraphQLModel(project)
		return projectModel, nil
	}
}

func (s *ProjectService) EnableProject(ctx context.Context, input model.IDInput) (model.Project, error) {
	project, err := port.IProjectAdapter(&adapter.ProjectAdapter{}).EnableProject(input.ID)
	if err != nil {
		return model.Project{}, err
	} else {
		projectModel := projectResponse.MapperToGraphQLModel(project)
		return projectModel, nil
	}
}