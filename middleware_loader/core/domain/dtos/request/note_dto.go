package request_dtos

import (
	"middleware_loader/infrastructure/graph/model"

	"github.com/devfeel/mapper"
)

type CreateNoteRequestDTO struct {
	Name               string  `json:"name"`
	OwnerId            float64 `json:"ownerId"`
	FileId             string  `json:"fileId"`
	FileName           string  `json:"fileName"`
	SummaryDisplayText string  `json:"summaryDisplayText"`
}

func NewCreateNoteRequestDTO() *CreateNoteRequestDTO {
	return &CreateNoteRequestDTO{}
}

func (in *CreateNoteRequestDTO) MapperToModel(input model.CreateNoteInput) {
	mapper.AutoMapper(&input, in)
}

type UpdateNoteRequestDTO struct {
	NoteId             string `json:"noteId"`
	Name               string `json:"name"`
	FileId             string `json:"fileId"`
	FileName           string `json:"fileName"`
	SummaryDisplayText string `json:"summaryDisplayText"`
}

func NewUpdateNoteRequestDTO() *UpdateNoteRequestDTO {
	return &UpdateNoteRequestDTO{}
}

func (in *UpdateNoteRequestDTO) MapperToModel(input model.UpdateNoteInput) {
	mapper.AutoMapper(&input, in)
}

type LockNoteRequestDTO struct {
	NoteId             string `json:"noteId"`
	NotePassword       string `json:"notePassword"`
	PasswordSuggestion string `json:"passwordSuggestion"`
}

func NewLockNoteRequestDTO() *LockNoteRequestDTO {
	return &LockNoteRequestDTO{}
}

func (in *LockNoteRequestDTO) MapperToModel(input model.LockNoteInput) {
	mapper.AutoMapper(&input, in)
}

type UnlockNoteRequestDTO struct {
	NoteId       string `json:"noteId"`
	NotePassword string `json:"notePassword"`
}

func NewUnlockNoteRequestDTO() *UnlockNoteRequestDTO {
	return &UnlockNoteRequestDTO{}
}

func (in *UnlockNoteRequestDTO) MapperToModel(input model.UnlockNoteInput) {
	mapper.AutoMapper(&input, in)
}

type UpdateNoteFileStatusRequestDTO struct {
	FileName string `json:"fileName"`
}

func NewUpdateNoteFileStatusRequestDTO() *UpdateNoteFileStatusRequestDTO {
	return &UpdateNoteFileStatusRequestDTO{}
}
