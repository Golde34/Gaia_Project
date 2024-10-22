package request_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type CreateRoleRequestDTO struct {
	ID          float64 `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	GrantedRank float64 `json:"grantedRank"`
}

func NreCreateRoleRequestDTO() *CreateRoleRequestDTO {
	return &CreateRoleRequestDTO{}
}

func (in *CreateRoleRequestDTO) MapperToModel(input model.RoleInput) {
	mapper.AutoMapper(&input, in)
}