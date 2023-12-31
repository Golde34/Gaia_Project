package mocks

import (
	"context"
	"log"

	"github.com/stretchr/testify/mock"
)

type MutationResolver struct {
	mock.Mock
}


func (_m *MutationResolver) SomethingFunction(ctx context.Context) {
	log.Println("MutationResolver")
}