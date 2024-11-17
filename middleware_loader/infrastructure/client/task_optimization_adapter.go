package client_adapter

import (
	"middleware_loader/core/domain/enums"
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

func (adapter *TaskOptimizationAdapter) OptimizeTaskByUser(userId string) (string, error) {
	optimizeTaskURL := base.WorkOptimizationServiceURL + task_optimization_domain + "/optimize-task-by-user?userId=" + userId 
	var response string
	_, err := utils.BaseAPIV2(optimizeTaskURL, enums.GET, nil, &response, nil)
	if err != nil {
		return "", err
	}
	return response, nil
}

