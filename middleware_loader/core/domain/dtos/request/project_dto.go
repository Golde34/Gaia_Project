package request_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type CreateProjectRequestDTO struct {
	Name         string `json:"name"`
	Description  string `json:"description"`
	Status       string `json:"status"`
	Color        string `json:"color"`
	Owner        string `json:"owner"`
	ActiveStatus string `json:"activeStatus"`
}

func NewCreateProjectRequestDTO() *CreateProjectRequestDTO {
	return &CreateProjectRequestDTO{}
}

// mapper from graphql model to dto
func (in *CreateProjectRequestDTO) MapperToModel(input model.CreateProjectInput) {
	mapper.AutoMapper(&input, in)
}