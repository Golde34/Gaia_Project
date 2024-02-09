package adapter

import (
	"encoding/json"
	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/adapter/base"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/configs"
)

type TaskAdapter struct {
	CreateTaskRequestDTO request_dtos.CreateTaskRequestDTO
}

func NewTaskAdapter() *TaskAdapter {
	return &TaskAdapter{}
}

var taskConfig = configs.Config{}
var taskManagerEnv, _ = taskConfig.LoadEnv()
var taskManagerServiceURL = taskManagerEnv.Url + taskManagerEnv.TaskManagerPort

func CreateTask(input model.CreateTaskInput) (response_dtos.CreateTaskResponseDTO, error) {
	createTaskURL := taskManagerServiceURL + "/task/create"
	var task response_dtos.CreateTaskResponseDTO	
	
	bodyResult, err := base.BaseAPI(createTaskURL, "POST", input)
	if err != nil {
		return response_dtos.CreateTaskResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	err = json.Unmarshal(dataBytes, &task)
	if err != nil {
		return response_dtos.CreateTaskResponseDTO{}, err
	}

	return task, nil
}