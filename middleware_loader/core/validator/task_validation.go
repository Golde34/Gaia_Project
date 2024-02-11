package validator

import (
	"fmt"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/enums"
	"middleware_loader/infrastructure/graph/model"
)

type TaskValidator struct {
	CreateTaskRequestDTO request_dtos.CreateTaskRequestDTO
	UpdateTaskRequestDTO request_dtos.UpdateTaskRequestDTO
}

func NewTaskDTOValidator() *TaskValidator {
	return &TaskValidator{}
}

func (in *TaskValidator) CreateTaskValidate(input model.CreateTaskInput) error {
	if input.Title == "" {
		return fmt.Errorf("%w: title is required", enums.ErrValidation)
	}

	return nil
}

func (in *TaskValidator) UpdateTaskValidate(input model.UpdateTaskInput) error {
	if input.Title == "" {
		return fmt.Errorf("%w: title is required", enums.ErrValidation)
	}

	return nil
}