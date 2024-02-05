package dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type CreateTaskDTO struct {
	Title        string    `json:"title"`
	Description  *string   `json:"description,omitempty"`
	Priority     []*string `json:"priority,omitempty"`
	Status       *string   `json:"status,omitempty"`
	StartDate    *string   `json:"startDate,omitempty"`
	Deadline     *string   `json:"deadline,omitempty"`
	Duration     *int      `json:"duration,omitempty"`
	ActiveStatus *string   `json:"activeStatus,omitempty"`
}

func NewCreateTaskDTO() *CreateTaskDTO {
	return &CreateTaskDTO{}
}

// mapper from graphql model to dto
func (in *CreateTaskDTO) MapperToModel(input model.CreateTaskInput) {
	mapper.AutoMapper(&input, in)
}