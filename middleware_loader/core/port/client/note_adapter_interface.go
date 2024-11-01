package client

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/graph/model"
)

type INoteAdapter interface {
	GetAllNotes(userId string) ([]response_dtos.NoteResponseDTO, error)
	CreateNote(input model.CreateNoteInput) (response_dtos.NoteResponseDTO, error)
	UpdateNote(input request_dtos.UpdateNoteRequestDTO) (response_dtos.NoteResponseDTO, error)
	LockNote(input model.LockNoteInput) (response_dtos.NoteResponseDTO, error)
	UnlockNote(input model.UnlockNoteInput) (response_dtos.NoteResponseDTO, error)
	DeleteNote(id string) (response_dtos.NoteResponseDTO, error)
	UpdateNoteFileStatus(noteId string, fileName string) (response_dtos.NoteResponseDTO, error)
	GetNoteById(id string) (response_dtos.NoteResponseDTO, error)
}