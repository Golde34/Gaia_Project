package client 

import (
	converter_dtos "middleware_loader/core/domain/dtos/converter"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/graph/model"
)

type IProjectAdapter interface {
	ListAll() ([]response_dtos.ProjectResponseDTO, error)
	GetById(id string) (response_dtos.ProjectResponseDTO, error)
	CreateProject(input model.CreateProjectInput) (response_dtos.ProjectResponseDTO, error)
	UpdateProject(input model.UpdateProjectInput, id string) (response_dtos.ProjectResponseDTO, error)
	DeleteProject(id string) (response_dtos.ProjectResponseDTO, error)
	GetGroupTasksInProject(id string) ([]response_dtos.GroupTaskResponseDTO, error)
	UpdateProjectName(input converter_dtos.UpdateNameConverterDTO, id string) (response_dtos.ProjectResponseDTO, error)
	UpdateProjectColor(input converter_dtos.UpdateColorConverterDTO, id string) (response_dtos.ProjectResponseDTO, error)
	ArchiveProject(id string) (response_dtos.ProjectResponseDTO, error)
	EnableProject(id string) (response_dtos.ProjectResponseDTO, error)
}