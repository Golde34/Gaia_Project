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

type UpdateGroupTaskRequestDTO struct {
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Priority    []string  `json:"priority"`
	Status      string    `json:"status"`
	Tasks       *[]string `json:"tasks"`
	GroupTaskId string    `json:"groupTaskId"`
	ProjectId   string    `json:"projectId"`
}

func NewUpdateGroupTaskRequestDTO() *UpdateGroupTaskRequestDTO {
	return &UpdateGroupTaskRequestDTO{}
}

func (in *UpdateGroupTaskRequestDTO) MapperToModel(input model.UpdateGroupTaskInput) {
	mapper.AutoMapper(&input, in)
}

type UpdateGroupTaskNameInputDTO struct {
	Name string `json:"name"`
	ID   string `json:"id"`
}

func NewUpdateGroupTaskNameInputDTO() *UpdateGroupTaskNameInputDTO {
	return &UpdateGroupTaskNameInputDTO{}
}

func (in *UpdateGroupTaskNameInputDTO) MapperToModel(input model.UpdateObjectNameInput) {
	mapper.AutoMapper(&input, in)
}

type GetProjectGroupTaskIdInputDTO struct {
	ProjectId   string `json:"projectId"`
	GroupTaskId string `json:"groupTaskId"`
}

func NewGetProjectGroupTaskIdInputDTO() *GetProjectGroupTaskIdInputDTO {
	return &GetProjectGroupTaskIdInputDTO{}
}

func (in *GetProjectGroupTaskIdInputDTO) MapperToModel(input model.ProjectGroupTaskIDInput) {
	mapper.AutoMapper(&input, in)
}

type GetTaskDetailInputDTO struct {
	UserId         float64 `json:"userId"`
	TaskId         string  `json:"taskId"`
	ScheduleTaskId string  `json:"scheduleTaskId"`
	TaskConfigId   string  `json:"taskConfigId"`
	TaskDetailType string `json:"taskDetailType"`
}

func NewGetTaskDetailInputDTO() *GetTaskDetailInputDTO {
	return &GetTaskDetailInputDTO{}
}

func (in *GetTaskDetailInputDTO) MapperToModel(taskId, scheduleTaskId, taskConfigId, taskDetailType string, userId float64) {
	in.UserId = userId
	in.TaskId = taskId
	in.ScheduleTaskId = scheduleTaskId
	in.TaskConfigId = taskConfigId
	in.TaskDetailType = taskDetailType
}
