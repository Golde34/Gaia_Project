package adapter_interface

import "middleware_loader/infrastructure/graph/model"

type IUserAdapter interface {
	ListAllUsers() ([]model.User, error)
}