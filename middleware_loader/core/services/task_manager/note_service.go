package services

import (
	"context"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/port/client"
	adapter "middleware_loader/infrastructure/client"
	"middleware_loader/infrastructure/graph/model"
)

type NoteService struct{}

func NewNoteService() *NoteService {
	return &NoteService{}
}

var noteResponse = response_dtos.NewNoteResponseDTO()

func (s *NoteService) GetAllNotes(ctx context.Context, input model.IDInput) ([]model.Note, error) {
	notes, err := client.INoteAdapter(&adapter.NoteAdapter{}).GetAllNotes(input.ID)
	if err != nil {
		return []model.Note{}, err
	}
	noteModel := noteResponse.MapperListToGraphQLModel(notes)

	return noteModel, nil
} 

func (s *NoteService) CreateNote(ctx context.Context, input model.CreateNoteInput) (model.Note, error) {
	note, err := client.INoteAdapter(&adapter.NoteAdapter{}).CreateNote(input)
	if err != nil {
		return model.Note{}, err
	}
	noteModel := noteResponse.MapperToGraphQLModel(note)

	return noteModel, nil
}

func (s *NoteService) UpdateNote(ctx context.Context, input model.UpdateNoteInput) (model.Note, error) {
	note, err := client.INoteAdapter(&adapter.NoteAdapter{}).UpdateNote(input, input.ID)
	if err != nil {
		return model.Note{}, err
	}
	noteModel := noteResponse.MapperToGraphQLModel(note)

	return noteModel, nil
}