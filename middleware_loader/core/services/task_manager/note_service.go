package services

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/port/client"
	adapter "middleware_loader/infrastructure/client"
	storages "middleware_loader/infrastructure/data_storage"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/configs"
	"os"
	"path/filepath"
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

func (s *NoteService) GetNoteFiles(noteId string, noteInfo io.ReadCloser) map[string]interface{} {
	var graphqlResponse struct {
		Data struct {
			Note model.Note `json:"getNote"`
		} `json:"data"`
	}
	if err := json.NewDecoder(noteInfo).Decode(&graphqlResponse); err != nil {
		log.Printf("Error decoding GraphQL response: %v", err)
		return nil
	}

	note := graphqlResponse.Data.Note
	if (noteId != note.ID) {
		log.Printf("Note ID does not match")
		return nil
	}

	fileContent, err := fetchFileFromDataStorage(note.FileID + "_" + note.FileName)
	if err != nil {
		log.Printf("Error fetching file for note %s: %v", note.Name, err)
	}

	noteResponse := map[string]interface{}{
		"noteId":      note.ID,
		"name":        note.Name,
		"ownerId":     note.OwnerID,
		"fileId":      note.FileID,
		"fileContent": fileContent,
	}
	return noteResponse 
}

func fetchFileFromDataStorage(tempFileName string) (string, error) {
	filePath := filepath.Join("./resources/", tempFileName)

	file, err := os.Open(filePath)
	if err != nil {
		return "", err
	}
	defer file.Close()
	contentBytes, err := io.ReadAll(file)
	if err != nil {
		return "", err
	}

	return string(contentBytes), nil
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

func (s *NoteService) UploadNoteFile(fileName string) (string, error) {
	filePath := filepath.Join("./resources/", fileName)
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		log.Println("File does not exist")
		return "", err
	}

	config := configs.Config{}
	cfg, _ := config.LoadEnv()
	datalakeConfig := cfg.Datalake
	
	switch datalakeConfig {
	case "local":
		storages.UploadToLocal(fileName, filePath)
	case "Hadoop":
		storages.UploadToHadoop(fileName, filePath)
	case "Minio":
		storages.UploadToMinio(fileName, filePath)
	case "S3":
		storages.UploadToS3(fileName, filePath)
	default:
		return "", fmt.Errorf("unsupported upload method: %s", datalakeConfig)
	}

	//delete tempFile
	if err := os.Remove(filePath); err != nil {
		log.Println("Error deleting temp file: ", err)
	}

	return fileName, nil
}

func (s *NoteService) LockNote(ctx context.Context, input model.IDInput) (model.Note, error) {
	note, err := client.INoteAdapter(&adapter.NoteAdapter{}).LockNote(input.ID)
	if err != nil {
		return model.Note{}, err
	}
	noteModel := noteResponse.MapperToGraphQLModel(note)

	return noteModel, nil
}