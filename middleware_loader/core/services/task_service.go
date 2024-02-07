package services

import (
	"context"
	"encoding/json"
	"log"
	"middleware_loader/core/domain/dtos"
	"middleware_loader/core/services/base"
	"middleware_loader/core/validator"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/configs"
	"strings"
)

type TaskService struct {
	CreateTaskInput dtos.CreateTaskDTO
}

func NewTaskService() *TaskService {
	return &TaskService{}
}

var taskValidator = validator.NewCreateTaskDTOValidator()
var taskManagerEnv, _ = configs.LoadEnv()

func (s *TaskService) CreateTask(ctx context.Context, input model.CreateTaskInput) (model.Task, error) {
	log.Print("CreateTask service called")
	err := taskValidator.CreateTaskValidate(input)
	if err != nil {
		return model.Task{}, err
	}
	log.Println("Validation passed!")

	input.Priority = ConvertStringToArray(input.Priority)

	taskManagerServiceURL := taskManagerEnv.Url + taskManagerEnv.TaskManagerPort + "/task/create"
	log.Printf("TaskManagerServiceURL: %v", taskManagerServiceURL)
	bodyResult, err := base.BaseAPI(taskManagerServiceURL, "POST", input)
	if err != nil {
		return model.Task{}, err
	}
	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	log.Printf("DataBytes: %v", dataBytes)
	var task model.Task
	err = json.Unmarshal(dataBytes, &task)
	if err != nil {
		return model.Task{}, err
	}

	log.Printf("Task created: %v", task)
	log.Printf("Error: %v", err)
	if err != nil {
		return model.Task{}, err
	}

	return task, nil
}

func (s *TaskService) CallTaskManagerService(input model.CreateTaskInput) (model.Task, error) {
	taskManagerServiceURL := taskManagerEnv.Url + taskManagerEnv.TaskManagerPort + "/task/create"

	bodyResult, err := base.BaseAPI(taskManagerServiceURL, "POST", input)
	if err != nil {
		return model.Task{}, err
	}
	dataBytes, err := base.ConvertResponseToMap(bodyResult)

	var task model.Task
	err = json.Unmarshal(dataBytes, &task)
	if err != nil {
		return model.Task{}, err
	}

	return task, nil
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
