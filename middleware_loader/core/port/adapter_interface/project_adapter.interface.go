package port

import (
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/graph/model"
)

type IProjectAdapter interface {
	CreateProject(input model.CreateProjectInput) (response_dtos.ProjectResponseDTO, error)
}