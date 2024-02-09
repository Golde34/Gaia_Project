package request_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type CreateTaskRequestDTO struct {
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Priority     []string `json:"priority"`
	Status       string   `json:"status"`
	StartDate    string   `json:"startDate"`
	Deadline     string   `json:"deadline"`
	Duration     string   `json:"duration"`
	ActiveStatus string   `json:"activeStatus"`
	GroupTaskId  string   `json:"groupTaskId"`
}

func NewCreateTaskRequestDTO() *CreateTaskRequestDTO {
	return &CreateTaskRequestDTO{}
}

// mapper from graphql model to dto
func (in *CreateTaskRequestDTO) MapperToModel(input model.CreateTaskInput) {
	mapper.AutoMapper(&input , in)
}