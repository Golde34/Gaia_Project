package request_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type UpdateUserRequestDTO struct {
	UserId   float64  `json:"userId"`
	Name     string   `json:"name"`
	Username string   `json:"username"`
	Email    string   `json:"email"`
	Roles    []string `json:"roles"`
}

func (in *UpdateUserRequestDTO) MapperToModel(input model.UpdateUserInput) {
	mapper.AutoMapper(&input, in)
}
func NewUpdateUserRequestDTO() *UpdateUserRequestDTO {
	return &UpdateUserRequestDTO{}
}
