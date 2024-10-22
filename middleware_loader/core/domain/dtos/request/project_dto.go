package request_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type IdInputDTO struct {
	Id string `json:"id"`
}

type CreateProjectRequestDTO struct {
	Name         string `json:"name"`
	Description  string `json:"description"`
	Status       string `json:"status"`
	Color        string `json:"color"`
	OwnerId      string `json:"ownerId"`
	ActiveStatus string `json:"activeStatus"`
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

type UpdateProjectNameInputDTO struct {
	Name string `json:"name"`
	ID   string `json:"id"`
}

type UpdateProjectColorInputDTO struct {
	Color string `json:"color"`
	ID    string `json:"id"`
}

func NewIdInputDTO() *IdInputDTO {
	return &IdInputDTO{}
}
func (in *IdInputDTO) MapperToModel(input model.IDInput) {
	mapper.AutoMapper(&input, in)
}

func NewCreateProjectRequestDTO() *CreateProjectRequestDTO {
	return &CreateProjectRequestDTO{}
}
func (in *CreateProjectRequestDTO) MapperToModel(input model.CreateProjectInput) {
	mapper.AutoMapper(&input, in)
}

func NewUpdateProjectRequestDTO() *UpdateProjectRequestDTO {
	return &UpdateProjectRequestDTO{}
}
func (in *UpdateProjectRequestDTO) MapperToModel(input model.UpdateProjectInput) {
	mapper.AutoMapper(&input, in)
}

func NewUpdateObjectNameInputDTO() *UpdateProjectNameInputDTO {
	return &UpdateProjectNameInputDTO{}
}
func (in *UpdateProjectNameInputDTO) MapperToModel(input model.UpdateObjectNameInput) {
	mapper.AutoMapper(&input, in)
}

func NewUpdateColorInputDTO() *UpdateProjectColorInputDTO {
	return &UpdateProjectColorInputDTO{}
}
func (in *UpdateProjectColorInputDTO) MapperToModel(input model.UpdateColorInput) {
	mapper.AutoMapper(&input, in)
}
