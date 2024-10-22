package response_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type NoteResponseDTO struct {
	ID                 string  `json:"id"`
	Name               string  `json:"name"`
	SummaryDisplayText *string `json:"summaryDisplayText"`
	FileId             string  `json:"fileId"`
	FileName           string  `json:"fileName"`
	FileLocation       *string `json:"fileLocation"`
	FileStatus         string  `json:"fileStatus"`
	IsLock             bool    `json:"isLock"`
	ActiveStatus       string  `json:"activeStatus"`
	CreatedAt          string  `json:"createdAt"`
	UpdatedAt          string  `json:"updatedAt"`
	OwnerId            float64 `json:"ownerId"`
}

func NewNoteResponseDTO() *NoteResponseDTO {
	return &NoteResponseDTO{}
}

func (in *NoteResponseDTO) MapperToGraphQLModel(input NoteResponseDTO) model.Note {
	var out model.Note
	mapper.AutoMapper(&input, &out)
	return out
}

func (in *NoteResponseDTO) MapperListToGraphQLModel(input []NoteResponseDTO) []model.Note {
	var out []model.Note
	for _, item := range input {
		out = append(out, in.MapperToGraphQLModel(item))
	}
	return out
}
