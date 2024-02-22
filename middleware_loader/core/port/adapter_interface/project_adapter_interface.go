package adapter_interface

import (
	model_dtos "middleware_loader/core/domain/dtos/request_model"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/graph/model"
)

type IProjectAdapter interface {
	ListAll() ([]response_dtos.ProjectResponseDTO, error)
	GetById(id string) (response_dtos.ProjectResponseDTO, error)
	CreateProject(input model.CreateProjectInput) (response_dtos.ProjectResponseDTO, error)
	UpdateProject(input model.UpdateProjectInput, id string) (response_dtos.ProjectResponseDTO, error)
	DeleteProject(id string) (response_dtos.ProjectResponseDTO, error)
	// GetGroupTasks(id string) ([]response_dtos.TaskResponseDTO, error)
	UpdateProjectName(input model.UpdateObjectNameInput, id string) (response_dtos.ProjectResponseDTO, error)
	UpdateProjectColor(input model_dtos.UpdateColorInputModel, id string) (response_dtos.ProjectResponseDTO, error)
	ArchiveProject(id string) (response_dtos.ProjectResponseDTO, error)
	EnableProject(id string) (response_dtos.ProjectResponseDTO, error)
}