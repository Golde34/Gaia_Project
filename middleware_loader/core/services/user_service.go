package services

import (
	"context"
	"log"
	response_dtos "middleware_loader/core/domain/dtos/response"
	port "middleware_loader/core/port/adapter_interface"
	"middleware_loader/core/validator"
	"middleware_loader/infrastructure/adapter"
	"middleware_loader/infrastructure/graph/model"
)

type UserService struct {
}

func NewUserService() *UserService {
	return &UserService{}
}

var userValidation = validator.NewUserDTOValidator()
var userResponse = response_dtos.NewUserDTO()

func (s *UserService) ListAllUsers(ctx context.Context) ([]model.ListAllUsers, error) {
	users, err := port.IUserAdapter(&adapter.UserAdapter{}).ListAllUsers()
	if err != nil {
		return nil, err
	}
	usersModel := userResponse.MapperListToGraphQLModel(users)
	log.Println("usersModel: ", usersModel)
	return usersModel, nil 
}

func (s *UserService) CreateUser(ctx context.Context, input model.CreateUserInput) (model.User, error) {
	err := userValidation.CreateUserValidate(input)
	if err != nil {
		return model.User{}, err
	}
	log.Println("Validation passed!")

	return model.User{}, nil
}