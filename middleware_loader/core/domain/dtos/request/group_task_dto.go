package request_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type CreateGroupTaskRequestDTO struct {
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Priority    []string  `json:"priority"`
	Status      string    `json:"status"`
	Tasks       *[]string `json:"tasks"`
	ProjectId   string    `json:"projectId"`
}

func NewCreateGroupTaskRequestDTO() *CreateGroupTaskRequestDTO {
	return &CreateGroupTaskRequestDTO{}
}

func (in *CreateGroupTaskRequestDTO) MapperToModel(input model.CreateGroupTaskInput) {
	mapper.AutoMapper(&input, in)
}