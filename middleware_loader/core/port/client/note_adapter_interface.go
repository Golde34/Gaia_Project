package client

import (
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/graph/model"
)

type INoteAdapter interface {
	GetAllNotes(userId string) ([]response_dtos.NoteResponseDTO, error)
	CreateNote(input model.CreateNoteInput) (response_dtos.NoteResponseDTO, error)
	UpdateNote(input model.UpdateNoteInput, id string) (response_dtos.NoteResponseDTO, error)
	LockNote(id string) (response_dtos.NoteResponseDTO, error)
}