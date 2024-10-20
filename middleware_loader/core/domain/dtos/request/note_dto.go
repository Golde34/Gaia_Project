package request_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type CreateNoteRequestDTO struct {
	Name   string  `json:"name"`
	UserId float64 `json:"userId"`
}

func NewCreateNoteRequestDTO() *CreateNoteRequestDTO {
	return &CreateNoteRequestDTO{}
}

func (in *CreateNoteRequestDTO) MapperToModel(input model.CreateNoteInput) {
	mapper.AutoMapper(&input, in)
}