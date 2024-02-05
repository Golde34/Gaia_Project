package validator

import (
	"fmt"
	"middleware_loader/core/domain/dtos"
	"middleware_loader/core/domain/enums"
	"middleware_loader/infrastructure/graph/model"
)

type TaskValidator struct {
	CreateTaskDTO dtos.CreateTaskDTO
}

func NewCreateTaskDTOValidator() *TaskValidator {
	return &TaskValidator{}
}

func (in *TaskValidator) CreateTaskValidate(input model.CreateTaskInput) error {
	in.CreateTaskDTO.MapperToModel(input)
	if in.CreateTaskDTO.Title == "" {
		return fmt.Errorf("%w: title is required", enums.ErrValidation)
	}

	return nil
}