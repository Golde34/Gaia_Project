package client

import (
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/graph/model"
)

type INoteAdapter interface {
	GetAllNotes(userId string) ([]response_dtos.NoteResponseDTO, error)
	CreateNote(input model.CreateNoteInput) (response_dtos.NoteResponseDTO, error)
	UpdateNote(input model.UpdateNoteInput, id string) (response_dtos.NoteResponseDTO, error)
	LockNote(input model.LockNoteInput) (response_dtos.NoteResponseDTO, error)
	UnlockNote(input model.UnlockNoteInput) (response_dtos.NoteResponseDTO, error)
	DeleteNote(id string) (response_dtos.NoteResponseDTO, error)
	UpdateNoteFileStatus(noteId string, fileName string) (response_dtos.NoteResponseDTO, error)
}