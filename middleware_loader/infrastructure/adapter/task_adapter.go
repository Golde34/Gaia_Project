package adapter

import (
	"encoding/json"
	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/adapter/base"
	"middleware_loader/infrastructure/graph/model"
)

type TaskAdapter struct {
	CreateTaskRequestDTO request_dtos.CreateTaskRequestDTO
	UpdateTaskRequestDTO request_dtos.UpdateTaskRequestDTO
}

func NewTaskAdapter() *TaskAdapter {
	return &TaskAdapter{}
}


func (adapter *TaskAdapter) CreateTask(input model.CreateTaskInput) (response_dtos.TaskResponseDTO, error) {
	createTaskURL := base.TaskManagerServiceURL + "/task/create"
	var task response_dtos.TaskResponseDTO	
	
	bodyResult, err := base.BaseAPI(createTaskURL, "POST", input)
	if err != nil {
		return response_dtos.TaskResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.TaskResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &task)
	if err != nil {
		return response_dtos.TaskResponseDTO{}, err
	}

	return task, nil
}

func (adapter *TaskAdapter) UpdateTask(input model.UpdateTaskInput, id string) (response_dtos.TaskResponseDTO, error) {
	updateTaskURL := base.TaskManagerServiceURL + "/task/" + id + "/update"
	var task response_dtos.TaskResponseDTO

	bodyResult, err := base.BaseAPI(updateTaskURL, "PUT", input)
	if err != nil {
		return response_dtos.TaskResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.TaskResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &task)
	if err != nil {
		return response_dtos.TaskResponseDTO{}, err
	}

	return task, nil
}