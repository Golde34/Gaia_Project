package mocks

import (
	"context"
	"log"

	"github.com/stretchr/testify/mock"
)

type UserRepo struct {
	mock.Mock
}

func (_m *UserRepo) CreateUser(ctx context.Context) (error) {
	log.Println("UserRepo")
	return nil
}