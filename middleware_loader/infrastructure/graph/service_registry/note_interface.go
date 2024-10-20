package service_registry

import (
	"context"
	"middleware_loader/infrastructure/graph/model"
)

type NoteService interface {
	GetAllNotes(ctx context.Context, input model.IDInput) ([]model.Note, error)
	CreateNote(ctx context.Context, input model.CreateNoteInput) (model.Note, error)
	UpdateNote(ctx context.Context, input model.UpdateNoteInput) (model.Note, error)
}