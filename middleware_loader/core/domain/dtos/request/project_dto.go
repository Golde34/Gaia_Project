package request_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type IdInputDTO struct {
	Id string `json:"id"`
}
func NewIdInputDTO() *IdInputDTO {
	return &IdInputDTO{}
}
func (in *IdInputDTO) MapperToModel(input model.IDInput) {
	mapper.AutoMapper(&input, in)
}

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

type UpdateProjectRequestDTO struct {
	Name         string `json:"name"`
	Description  string `json:"description"`
	Status       string `json:"status"`	
	Color        string `json:"color"`
	Owner        string `json:"owner"`
	ActiveStatus string `json:"activeStatus"`
	ProjectId    string `json:"projectId"`
}

func NewUpdateProjectRequestDTO() *UpdateProjectRequestDTO {
	return &UpdateProjectRequestDTO{}
}

// mapper from graphql model to dto
func (in *UpdateProjectRequestDTO) MapperToModel(input model.UpdateProjectInput) {
	mapper.AutoMapper(&input, in)
}