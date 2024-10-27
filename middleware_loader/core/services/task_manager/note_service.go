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
	if noteId != note.ID {
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

func (s *NoteService) UploadNoteFile(noteId string, fileName string) (string, error) {
	filePath := filepath.Join("./resources/", fileName)
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		log.Println("File does not exist")
		return "", err
	}

	config := configs.Config{}
	cfg, _ := config.LoadEnv()
	datalakeConfig := cfg.Datalake

	var storagePath string
	var err error

	switch datalakeConfig {
	case "local":
		storagePath, err = storages.UploadToLocal(fileName, filePath)
	case "Hadoop":
		storagePath, err = storages.UploadToHadoop(fileName, filePath)
	case "Minio":
		storagePath, err = storages.UploadToMinio(fileName, filePath)
	case "S3":
		storagePath, err = storages.UploadToS3(fileName, filePath)
	default:
		return "", fmt.Errorf("unsupported upload method: %s", datalakeConfig)
	}

	if err != nil {
		return "", fmt.Errorf("failed to upload file: %v", err)
	}

	// delete temp file
	if err := os.Remove(filePath); err != nil {
		log.Println("Error deleting temp file:", err)
	}

	// update file status in TM
	fmt.Println("Updating file status in TM")
	note, err := client.INoteAdapter(&adapter.NoteAdapter{}).UpdateNoteFileStatus(noteId, storagePath)
	if err != nil {
		return "", err
	} else {
		fmt.Println("File status updated successfully: ", note)
	}

	return storagePath, nil
}

func (s *NoteService) LockNote(ctx context.Context, input model.LockNoteInput) (model.Note, error) {
	note, err := client.INoteAdapter(&adapter.NoteAdapter{}).LockNote(input)
	if err != nil {
		return model.Note{}, err
	}
	noteModel := noteResponse.MapperToGraphQLModel(note)

	return noteModel, nil
}

func (s *NoteService) UnlockNote(ctx context.Context, input model.UnlockNoteInput) (model.Note, error) {
	note, err := client.INoteAdapter(&adapter.NoteAdapter{}).UnlockNote(input)
	if err != nil {
		return model.Note{}, err
	}
	noteModel := noteResponse.MapperToGraphQLModel(note)

	return noteModel, nil
}

func (s *NoteService) DeleteNoteById(id string) (model.Note, error) {
	note, err := client.INoteAdapter(&adapter.NoteAdapter{}).DeleteNote(id)
	if err != nil {
		return model.Note{}, err
	}
	noteModel := noteResponse.MapperToGraphQLModel(note)

	storagePath, err := s.deleteNoteFile(noteModel)
	if err != nil {
		// Neu khong xoa duoc file thi luu log
		fmt.Println("Error deleting file: ", err)
	} else {
		fmt.Println("File deleted successfully: ", storagePath)
	}

	return noteModel, nil
}

func (s *NoteService) deleteNoteFile(note model.Note) (string, error) {
	config := configs.Config{}
	cfg, _ := config.LoadEnv()
	datalakeConfig := cfg.Datalake
	fileName := note.FileName
	var fileLocation string
	if note.FileLocation != nil {
		fileLocation = *note.FileLocation
	} else {
		return "", fmt.Errorf("file location is nil")
	}

	var storagePath string
	var err error

	switch datalakeConfig {
	case "local":
		storagePath, err = storages.DeleteLocal(fileName, fileLocation)
	case "Hadoop":
		storagePath, err = storages.DeleteHadoop(fileName, fileLocation)
	case "Minio":
		storagePath, err = storages.DeleteMinio(fileName, fileLocation)
	case "S3":
		storagePath, err = storages.DeleteS3(fileName, fileLocation)
	default:
		return "", fmt.Errorf("unsupported upload method: %s", datalakeConfig)
	}

	if err != nil {
		return "", fmt.Errorf("failed to delete file: %v", err)
	}

	return storagePath, nil
}
