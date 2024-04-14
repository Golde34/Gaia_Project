package base

import (
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/graph/model"
)

func ConvertTaskPointer(tasks []response_dtos.TaskResponseDTO) []*model.Task {
	var taskPointer []*model.Task
	for _, task := range tasks {
		taskPointer = append(taskPointer, &model.Task{
			ID:           task.ID,
			Title:        task.Title,
			Description:  task.Description,
			Priority:     task.Priority,
			Status:       task.Status,
			StartDate:    task.StartDate,
			Deadline:     task.Deadline,
			Duration:     task.Duration,
			ActiveStatus: task.ActiveStatus,
			CreatedAt:    task.CreatedAt,
			UpdatedAt:    task.UpdatedAt,
			GroupTask:    task.GroupTaskId,
			SubTasks:     task.SubTasks,
			Comments:     task.Comments,
		})
	}
	return taskPointer
}
