package services 

import (
	"middleware_loader/core/domain/dtos"
	"middleware_loader/core/validator"
	"middleware_loader/kernel/configs"
)

type TaskService struct {
	CreateTaskInput dtos.CreateTaskDTO
}

func NewTaskService() *TaskService {
	return &TaskService{}
}

var taskValidator = validator.NewCreateTaskDTOValidator()
var taskManagerEnv, _ = configs.LoadEnv()