package response_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type TaskResponseDTO struct {
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

func NewCreateTaskResponseDTO() *TaskResponseDTO {
	return &TaskResponseDTO{}
}

// mapper from dto to graphql model
func (in *TaskResponseDTO) MapperToGraphQLModel(input TaskResponseDTO) model.Task{
	var out model.Task
	mapper.AutoMapper(&input, &out)
	return out
}