package client_adapter

import (
	"fmt"
	base_dtos "middleware_loader/core/domain/dtos/base"
	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/domain/enums"
	mapper_response "middleware_loader/core/port/mapper/response"
	"middleware_loader/infrastructure/client/base"
	"middleware_loader/kernel/utils"
)

var task_optimization_domain = "/work-optimization"

type TaskOptimizationAdapter struct {
	adapter *TaskOptimizationAdapter
}

func NewTaskOptimizationAdapter(adapter *TaskOptimizationAdapter) *TaskOptimizationAdapter {
	return &TaskOptimizationAdapter{adapter: adapter}
}

func (adapter *TaskOptimizationAdapter) OptimizeTaskByUser(input request_dtos.OptimizeTaskByUser) ([]response_dtos.OptimizedTaskByUser, error) {
	optimizeTaskURL := base.WorkOptimizationServiceURL + task_optimization_domain + "/optimize-task-by-user"
	var tasks []response_dtos.OptimizedTaskByUser
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.FullResponseBaseAPI(optimizeTaskURL, enums.POST, input, headers)
	if err != nil {
		return nil, fmt.Errorf("failed to call optimization API: %w", err)
	}

	bodyResultMap, ok := bodyResult.(base_dtos.ErrorResponse)
	if !ok {
		return nil, fmt.Errorf("failed to convert object: %w", err) 
	}
	if bodyResultMap.ErrorCode != 200 {
		return nil, fmt.Errorf("failed because WO has exception")
	}

	for _, taskElement := range bodyResultMap.Data.([]interface{}) {
		task := mapper_response.ReturnOptimizedTaskListMapper(taskElement.(map[string]interface{}))
		tasks = append(tasks, *task)
	}

	return tasks, nil
}
