package dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)


type AuthDTO struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func NewAuthDTO() *AuthDTO {
	return &AuthDTO{}
}

// mapper from graphql model to dto
func (in *AuthDTO) MapperToModel(input model.SigninInput) {
	mapper.AutoMapper(&input, in)
}
