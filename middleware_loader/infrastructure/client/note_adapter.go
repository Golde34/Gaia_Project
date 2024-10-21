package client_adapter

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	response_dtos "middleware_loader/core/domain/dtos/response"
	mapper_response "middleware_loader/core/port/mapper/response"
	"middleware_loader/infrastructure/client/base"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
)

type NoteAdapter struct {
	CreateNoteRequestDTO request_dtos.CreateNoteRequestDTO
}

func NewNoteAdapter() *NoteAdapter {
	return &NoteAdapter{}
}

func (adapter *NoteAdapter) GetAllNotes(userId string) ([]response_dtos.NoteResponseDTO, error) {
	listAllNotesURL := base.TaskManagerServiceURL + "/note/" + userId
	var notes []response_dtos.NoteResponseDTO
	headers := utils.BuildDefaultHeaders()
	result, err := utils.BaseAPI(listAllNotesURL, "GET", nil, headers)

	if err != nil {
		return []response_dtos.NoteResponseDTO{}, err
	}

	bodyResultMap, ok := result.(map[string]interface{})
	if !ok {
		return []response_dtos.NoteResponseDTO{}, nil
	}
	for _, noteElement := range bodyResultMap["message"].([]interface{}) {
		note := mapper_response.ReturnNoteObjectMapper(noteElement.(map[string]interface{}))
		notes = append(notes, *note)
	}
	
	return notes, nil
}

func (adapter *NoteAdapter) CreateNote(input model.CreateNoteInput) (response_dtos.NoteResponseDTO, error) {
	createNoteURL := base.TaskManagerServiceURL + "/note/create"
	var note response_dtos.NoteResponseDTO
	headers := utils.BuildDefaultHeaders()
	result, err := utils.BaseAPIV2(createNoteURL, "POST", input, &note, headers)
	if err != nil {
		return response_dtos.NoteResponseDTO{}, err
	}
	return result.(response_dtos.NoteResponseDTO), nil
}

func (adapter *NoteAdapter) UpdateNote(input model.UpdateNoteInput, id string) (response_dtos.NoteResponseDTO, error) {
	updateNoteURL := base.TaskManagerServiceURL + "/note/" + id 
	var note response_dtos.NoteResponseDTO
	headers := utils.BuildDefaultHeaders()
	result, err := utils.BaseAPIV2(updateNoteURL, "PUT", input, &note, headers)
	if err != nil {
		return response_dtos.NoteResponseDTO{}, err
	}
	return result.(response_dtos.NoteResponseDTO), nil
}