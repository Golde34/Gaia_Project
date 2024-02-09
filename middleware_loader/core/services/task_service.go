package services

import (
	"context"
	"log"

	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/validator"
	"middleware_loader/infrastructure/adapter"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/configs"
	"strings"
)

type TaskService struct {
	CreateTaskRequestDTO request_dtos.CreateTaskRequestDTO
}

func NewTaskService() *TaskService {
	return &TaskService{}
}

var taskValidator = validator.NewCreateTaskDTOValidator()
var taskConfig = configs.Config{}
var taskManagerEnv, _ = taskConfig.LoadEnv()

func (s *TaskService) CreateTask(ctx context.Context, input model.CreateTaskInput) (model.Task, error) {
	err := taskValidator.CreateTaskValidate(input)
	if err != nil {
		return model.Task{}, err
	}
	log.Println("Validation passed!")

	input.Priority = ConvertStringToArray(input.Priority)

	task, err := adapter.CreateTask(input)
	if err != nil {
		return model.Task{}, err
	} else {
		taskModel := response_dtos.NewCreateTaskResponseDTO().MapperToGraphQLModel(task)
		return taskModel, nil
	}
}

func ConvertStringToArray(input []string) []string {
	if len(input) == 0 {
		return nil
	}
	stringComponent := input[0]
	stringComponent = strings.Trim(stringComponent, "[]")
	listComponent := strings.Fields(stringComponent)
	return listComponent
}
