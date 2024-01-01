package validator

import (
	"fmt"

	"middleware_loader/core/domain/dtos"
	"middleware_loader/core/domain/enums"
	"middleware_loader/infrastructure/graph/model"
)

type AuthValidator struct {
	AuthDTO dtos.AuthDTO
}

func NewAuthDTOValidator() *AuthValidator {
	return &AuthValidator{}
}

func (in *AuthValidator) AuthValidate(input model.SigninInput) error {
	in.AuthDTO.MapperToModel(input)
	if len(in.AuthDTO.Password) < 1 {
		return fmt.Errorf("%w: password is required", enums.ErrValidation)
	}

	if in.AuthDTO.Username == "" {
		return fmt.Errorf("%w: username is required", enums.ErrValidation)
	}

	return nil
}