package response_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type ProjectResponseDTO struct {
	ID           string       `json:"id"`
	Name         string       `json:"name"`
	Description  string       `json:"description"`
	Status       string       `json:"status"`
	Color        string       `json:"color"`
	ActiveStatus string       `json:"activeStatus"`
	GroupTasks   []*string `json:"groupTasks"`
	Owner        *string        `json:"owner"`
	CreatedAt    string       `json:"createdAt"`
	UpdatedAt    string       `json:"updatedAt"`
}

func NewCreateProjectResponseDTO() *ProjectResponseDTO {
	return &ProjectResponseDTO{}
}

// mapper from dto to graphql model
func (in *ProjectResponseDTO) MapperToGraphQLModel(input ProjectResponseDTO) model.Project{
	var out model.Project
	mapper.AutoMapper(&input, &out)
	return out
}

func (in *ProjectResponseDTO) MapperListToGraphQLModel(input []ProjectResponseDTO) []model.Project{
	var out []model.Project
	mapper.AutoMapper(&input, &out)
	return out
}