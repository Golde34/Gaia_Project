package services

import (
	"context"
	"log"

	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/validator"
	"middleware_loader/infrastructure/adapter"
	"middleware_loader/infrastructure/graph/model"
	"strings"
)

type TaskService struct {
	CreateTaskRequestDTO request_dtos.CreateTaskRequestDTO
	UpdateTaskRequestDTO request_dtos.UpdateTaskRequestDTO
}

func NewTaskService() *TaskService {
	return &TaskService{}
}

var taskValidator = validator.NewTaskDTOValidator()

func (s *TaskService) CreateTask(ctx context.Context, input model.CreateTaskInput) (model.Task, error) {
	err := taskValidator.CreateTaskValidate(input)
	if err != nil {
		return model.Task{}, err
	}
	log.Println("Validation passed!")

	input.Priority = ConvertStringToArray(input.Priority)

	task, err := adapter.NewTaskAdapter().CreateTask(input)
	if err != nil {
		return model.Task{}, err
	} else {
		taskModel := response_dtos.NewCreateTaskResponseDTO().MapperToGraphQLModel(task)
		return taskModel, nil
	}
}

func (s *TaskService) UpdateTask(ctx context.Context, input model.UpdateTaskInput) (model.Task, error) {
	err := taskValidator.UpdateTaskValidate(input)
	if err != nil {
		return model.Task{}, err
	}
	log.Println("Validation passed!")

	input.Priority = ConvertStringToArray(input.Priority)
	taskId := input.TaskID

	task, err := adapter.NewTaskAdapter().UpdateTask(input, taskId)
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
