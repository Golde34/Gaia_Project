package response_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type GroupTaskResponseDTO struct {
	ID		  string `json:"id"`
	Title	 string `json:"title"`
	Description string `json:"description"`
	Priority []string `json:"priority"`
	Status string `json:"status"`
	Tasks []string `json:"tasks"`
	TotalTasks int `json:"totalTasks"`
	CompletedTasks int `json:"completedTasks"`
	OrdinalNumber int `json:"ordinalNumber"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
	ActiveStatus string `json:"activeStatus"`
}

func NewGroupTaskResponseDTO() *GroupTaskResponseDTO {
	return &GroupTaskResponseDTO{}
}

func (in *GroupTaskResponseDTO) MapperToGraphQLModel(input GroupTaskResponseDTO) model.GroupTask{
	var out model.GroupTask
	mapper.AutoMapper(&input, &out)
	return out
}

func (in *GroupTaskResponseDTO) MapperListToGraphQLModel(input []GroupTaskResponseDTO) []model.GroupTask{
	var out []model.GroupTask
	for _, item := range input {
		out = append(out, in.MapperToGraphQLModel(item))
	}
	return out
}