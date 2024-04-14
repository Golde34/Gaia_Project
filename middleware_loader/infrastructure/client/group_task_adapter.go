package client_adapter

import (
	"encoding/json"
	converter_dtos "middleware_loader/core/domain/dtos/converter"
	response_dtos "middleware_loader/core/domain/dtos/response"
	mapper_response "middleware_loader/core/port/mapper/response"
	"middleware_loader/infrastructure/client/base"
	"middleware_loader/infrastructure/graph/model"
)

type GroupTaskAdapter struct {
	adapter *GroupTaskAdapter
}

func NewGroupTaskAdapter(adapter *GroupTaskAdapter) *GroupTaskAdapter {
	return &GroupTaskAdapter{adapter: adapter}
}

func (adapter *GroupTaskAdapter) GetGroupTaskById(id string) (response_dtos.GroupTaskResponseDTO, error) {
	getGroupTaskURL := base.TaskManagerServiceURL + "/group-task/" + id
	var groupTask response_dtos.GroupTaskResponseDTO

	bodyResult, err := base.BaseAPI(getGroupTaskURL, "GET", nil)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &groupTask)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	return groupTask, nil
}

func (adapter *GroupTaskAdapter) CreateGroupTask(input model.CreateGroupTaskInput) (response_dtos.GroupTaskResponseDTO, error) {
	createGroupTaskURL := base.TaskManagerServiceURL + "/group-task/create"
	var groupTask response_dtos.GroupTaskResponseDTO

	bodyResult, err := base.BaseAPI(createGroupTaskURL, "POST", input)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &groupTask)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	return groupTask, nil
}

func (adapter *GroupTaskAdapter) UpdateGroupTask(input model.UpdateGroupTaskInput, id string) (response_dtos.GroupTaskResponseDTO, error) {
	updateGroupTaskURL := base.TaskManagerServiceURL + "/group-task/" + id
	var groupTask response_dtos.GroupTaskResponseDTO

	bodyResult, err := base.BaseAPI(updateGroupTaskURL, "PUT", input)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &groupTask)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	return groupTask, nil
}

func (adapter *GroupTaskAdapter) DeleteGroupTask(id string) (response_dtos.GroupTaskResponseDTO, error) {
	deleteGroupTaskURL := base.TaskManagerServiceURL + "/group-task/" + id
	var groupTask response_dtos.GroupTaskResponseDTO

	bodyResult, err := base.BaseAPI(deleteGroupTaskURL, "DELETE", nil)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &groupTask)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	return groupTask, nil
}

func (adapter *GroupTaskAdapter) GetTasksByGroupTask(id string) (response_dtos.TaskDashboardResponseDTO, error) {
	getTasksURL := base.TaskManagerServiceURL + "/group-task/" + id + "/tasks"
	var doneTaskList []response_dtos.TaskResponseDTO
	var notDoneTaskList []response_dtos.TaskResponseDTO
	var taskDashboard response_dtos.TaskDashboardResponseDTO
	bodyResult, err := base.BaseAPI(getTasksURL, "GET", nil)
	if err != nil {
		return response_dtos.TaskDashboardResponseDTO{}, err
	}

	bodyResultMap, ok := bodyResult.(map[string]interface{})
	if !ok {
		return response_dtos.TaskDashboardResponseDTO{}, err
	}

	for _, taskElement := range bodyResultMap["message"].(map[string]interface{})["doneTaskList"].([]interface{}) {
		task := mapper_response.ReturnTaskObjectMapper(taskElement.(map[string]interface{}))
		doneTaskList = append(doneTaskList, *task)
	}

	for _, taskElement := range bodyResultMap["message"].(map[string]interface{})["notDoneTaskList"].([]interface{}) {
		task := mapper_response.ReturnTaskObjectMapper(taskElement.(map[string]interface{}))
		notDoneTaskList = append(notDoneTaskList, *task)
	}

	taskDashboard.DoneTaskList = base.ConvertTaskPointer(doneTaskList)
	taskDashboard.NotDoneTaskList = base.ConvertTaskPointer(notDoneTaskList)
	// taskDashboard.DoneTaskList = doneTaskList
	// taskDashboard.NotDoneTaskList = notDoneTaskList

	return taskDashboard, nil
}

func (adapter *GroupTaskAdapter) UpdateGroupTaskName(input converter_dtos.UpdateNameConverterDTO, id string) (response_dtos.GroupTaskResponseDTO, error) {
	updateGroupTaskNameURL := base.TaskManagerServiceURL + "/group-task/" + id + "/update-name"
	var groupTask response_dtos.GroupTaskResponseDTO

	bodyResult, err := base.BaseAPI(updateGroupTaskNameURL, "PUT", input)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &groupTask)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	return groupTask, nil
}

func (adapter *GroupTaskAdapter) CalculateCompletedTasks(id string) (response_dtos.GroupTaskResponseDTO, error) {
	calculateCompletedTasksURL := base.TaskManagerServiceURL + "/group-task/" + id + "tasks-complete"
	var groupTask response_dtos.GroupTaskResponseDTO

	bodyResult, err := base.BaseAPI(calculateCompletedTasksURL, "GET", nil)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &groupTask)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	return groupTask, nil
}

func (adapter *GroupTaskAdapter) UpdateGroupTaskOrdinal(input model.ProjectGroupTaskIDInput, id string) (response_dtos.GroupTaskResponseDTO, error) {
	updateGroupTaskOrdinalURL := base.TaskManagerServiceURL + "/group-task/" + id + "/update-ordinal"
	var groupTask response_dtos.GroupTaskResponseDTO

	bodyResult, err := base.BaseAPI(updateGroupTaskOrdinalURL, "PUT", input)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &groupTask)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	return groupTask, nil
}

func (adapter *GroupTaskAdapter) ArchiveGroupTask(id string) (response_dtos.GroupTaskResponseDTO, error) {
	archiveGroupTaskURL := base.TaskManagerServiceURL + "/group-task/" + id + "/archive"
	var groupTask response_dtos.GroupTaskResponseDTO

	bodyResult, err := base.BaseAPI(archiveGroupTaskURL, "PUT", nil)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &groupTask)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	return groupTask, nil
}

func (adapter *GroupTaskAdapter) EnableGroupTask(id string) (response_dtos.GroupTaskResponseDTO, error) {
	enableGroupTaskURL := base.TaskManagerServiceURL + "/group-task/" + id + "/enable"
	var groupTask response_dtos.GroupTaskResponseDTO

	bodyResult, err := base.BaseAPI(enableGroupTaskURL, "PUT", nil)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	dataBytes, err := base.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &groupTask)
	if err != nil {
		return response_dtos.GroupTaskResponseDTO{}, err
	}

	return groupTask, nil
}
