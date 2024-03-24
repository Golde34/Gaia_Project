package services

import (
	"context"
	"log"
	"middleware_loader/core/validator"
	"middleware_loader/infrastructure/graph/model"
)

type UserService struct {
}

func NewUserService() *UserService {
	return &UserService{}
}

var userValidation = validator.NewUserDTOValidator()
// var userResponse = response_dtos.NewUserResponseDTO()

func (s *UserService) ListAllUsers(ctx context.Context) ([]model.User, error) {
	return nil, nil
}

func (s *UserService) CreateUser(ctx context.Context, input model.CreateUserInput) (model.User, error) {
	err := userValidation.CreateUserValidate(input)
	if err != nil {
		return model.User{}, err
	}
	log.Println("Validation passed!")

	return model.User{}, nil
}