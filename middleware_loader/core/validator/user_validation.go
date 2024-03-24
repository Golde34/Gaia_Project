package validator

import (
	"fmt"
	"middleware_loader/core/domain/enums"
	"middleware_loader/infrastructure/graph/model"
)

type UserValidator struct {
}

func NewUserDTOValidator() *UserValidator {
	return &UserValidator{}
}

func (in *UserValidator) CreateUserValidate(input model.CreateUserInput) error {
	if input.Name == "" {
		return fmt.Errorf("%w: name is required", enums.ErrValidation)
	}

	if input.Username == "" {
		return fmt.Errorf("%w: username is required", enums.ErrValidation)
	}

	if input.Email == "" {
		return fmt.Errorf("%w: email is required", enums.ErrValidation)
	}

	if input.Password == "" {
		return fmt.Errorf("%w: password is required", enums.ErrValidation)
	}

	return nil
}
