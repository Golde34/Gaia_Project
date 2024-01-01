package dtos

import "middleware_loader/infrastructure/graph/model"

type AuthDTO struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func NewAuthDTO() *AuthDTO {
	return &AuthDTO{}
}

// mapper from graphql model to dto
func (in *AuthDTO) MapperToModel(input model.SigninInput) {
	in.Username = input.Username
	in.Password = input.Password
}
