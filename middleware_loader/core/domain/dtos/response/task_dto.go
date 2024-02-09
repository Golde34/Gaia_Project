package response_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type CreateTaskResponseDTO struct {
	ID           string   `json:"id"`
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Priority     []string `json:"priority"`
	Status       string   `json:"status"`
	StartDate    string   `json:"startDate"`
	Deadline     string   `json:"deadline"`
	Duration     string   `json:"duration"`
	ActiveStatus string   `json:"activeStatus"`
	
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`

	GroupTaskId string `json:"groupTaskId"`
	SubTasks    []string `json:"subTasks"`
	Comments    []string `json:"comments"`
}

func NewCreateTaskResponseDTO() *CreateTaskResponseDTO {
	return &CreateTaskResponseDTO{}
}

// mapper from dto to graphql model
func (in *CreateTaskResponseDTO) MapperToGraphQLModel(input CreateTaskResponseDTO) model.Task{
	var out model.Task
	mapper.AutoMapper(&input, &out)
	return out
}

