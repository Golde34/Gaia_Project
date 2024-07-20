package client_adapter

import (
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/client/base"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
)

var task_register_WO_domain = "/work-optimization"
var task_register_TM_domain = "/task-manager"
var task_register_SP_domain = "/schedule-plan"

type TaskRegisterAdapter struct {
	adapter *TaskRegisterAdapter
}

func NewTaskRegisterAdapter(adapter *TaskRegisterAdapter) *TaskRegisterAdapter {
	return &TaskRegisterAdapter{adapter: adapter}
}

func (adapter *TaskRegisterAdapter) RegisterTaskConfig(input model.RegisterTaskInput) (response_dtos.RegisterTaskConfigResponseDTO, error) {
	registerTaskConfigURL := base.WorkOptimizationServiceURL + task_register_WO_domain + "/register-task-config"
	var response response_dtos.RegisterTaskConfigResponseDTO
	result, err := utils.BaseAPIV2(registerTaskConfigURL, "POST", input, &response)
	if err != nil {
		return response_dtos.RegisterTaskConfigResponseDTO{}, err
	}
	return result.(response_dtos.RegisterTaskConfigResponseDTO), nil
}

func (adapter *TaskRegisterAdapter) IsTaskExisted(input model.RegisterTaskInput) (response_dtos.IsTaskExistedResponseDTO, error) {
	isTaskExistedURL := base.WorkOptimizationServiceURL + task_register_TM_domain + "/is-task-existed"
	var response response_dtos.IsTaskExistedResponseDTO
	result, err := utils.BaseAPIV2(isTaskExistedURL, "POST", input, &response)
	if err != nil {
		return response_dtos.IsTaskExistedResponseDTO{}, err
	}
	return result.(response_dtos.IsTaskExistedResponseDTO), nil
}

func (adapter *TaskRegisterAdapter) IsScheduleExisted(input model.RegisterTaskInput) (response_dtos.IsScheduleExistedResponseDTO, error) {
	isScheduleExistedURL := base.WorkOptimizationServiceURL + task_register_SP_domain + "/is-schedule-existed"
	var response response_dtos.IsScheduleExistedResponseDTO
	result, err := utils.BaseAPIV2(isScheduleExistedURL, "POST", input, &response)
	if err != nil {
		return response_dtos.IsScheduleExistedResponseDTO{}, err
	}
	return result.(response_dtos.IsScheduleExistedResponseDTO), nil
}