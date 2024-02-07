package dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type CreateTaskDTO struct {
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Priority     []string `json:"priority"`
	Status       string   `json:"status"`
	StartDate    string   `json:"startDate"`
	Deadline     string   `json:"deadline"`
	Duration     string   `json:"duration"`
	ActiveStatus string   `json:"activeStatus"`
}

func NewCreateTaskDTO() *CreateTaskDTO {
	return &CreateTaskDTO{}
}

// mapper from graphql model to dto
func (in *CreateTaskDTO) MapperToModel(input model.CreateTaskInput) {
	mapper.AutoMapper(&input , in)
}