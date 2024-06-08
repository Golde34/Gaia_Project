package services

import (
	"context"
	"log"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/port/client"
	"middleware_loader/core/validator"
	adapter "middleware_loader/infrastructure/client"
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
	users, err := client.IUserAdapter(&adapter.UserAdapter{}).ListAllUsers()
	if err != nil {
		return nil, err
	}
	usersModel := userResponse.MapperListToGraphQLModel(users)
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

func (s *UserService) UpdateUser(ctx context.Context, input model.UpdateUserInput) (model.UpdateUser, error) {
	err := userValidation.UpdateUserValidate(input)
	if err != nil {
		return model.UpdateUser{}, err
	}
	log.Println("Validation passed!")

	user, err := client.IUserAdapter(&adapter.UserAdapter{}).UpdateUser(input)
	if err != nil {
		return model.UpdateUser{}, err
	} else {
		userModel := userResponse.UserMapperToGraphQLModel(user)
		return userModel, nil
	}
}
