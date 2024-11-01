package consumer

import (
	"encoding/json"
	"fmt"
	"log"
	base_dtos "middleware_loader/core/domain/dtos/base"
	services "middleware_loader/core/services/task_manager"
	"strings"
)

type UploadNoteFileHandler struct{}

func (h *UploadNoteFileHandler) HandleMessage(topic string, key, value []byte) {
	fmt.Printf("Handling message for topic %s: %s\n", topic, string(value))

	var message base_dtos.KafkaMessage
	if err := json.Unmarshal(value, &message); err != nil {
		fmt.Printf("Error unmarshalling message: %v\n", err)
		return
	}
	data, ok := message.Data.(map[string]interface{})
	if !ok {
		fmt.Printf("Error: message data is not of expected type\n")
		return
	}

	switch message.Cmd {
	case "uploadFile":
		UploadNoteFileCmd(data)
	case "uploadUpdatedFile":
		UploadUpdatedNoteFileCmd(data)
	default:
		log.Printf("Message handled successfully, but the cmd does not match to consumer to process it")
	}
}

func UploadNoteFileCmd(data map[string]interface{}) {
	noteId, ok := data["noteId"].(string)
	if !ok {
		fmt.Printf("Error: noteId is not a string\n")
		return
	}
	fileId, ok := data["fileId"].(string)
	if !ok {
		fmt.Printf("Error: fileId is not a string\n")
		return
	}
	fileName, ok := data["fileName"].(string)
	if !ok {
		fmt.Printf("Error: fileName is not a string\n")
		return
	}

	if !strings.Contains(fileName, fileId) {
		fmt.Printf("Error: fileName does not contain fileId\n")
		return
	}

	noteService := services.NewNoteService()
	result, err := noteService.UploadNoteFile(noteId, fileName)
	if err != nil {
		fmt.Printf("Error uploading note file: %v\n", err)
	}

	log.Printf("Upload note file result: %v", result)
}

func UploadUpdatedNoteFileCmd(data map[string]interface{}) {
	noteId, ok := data["noteId"].(string)
	if !ok {
		fmt.Printf("Error: noteId is not a string\n")
		return
	}
	fileId, ok := data["fileId"].(string)
	if !ok {
		fmt.Printf("Error: fileId is not a string\n")
		return
	}
	fileName, ok := data["fileName"].(string)
	if !ok {
		fmt.Printf("Error: fileName is not a string\n")
		return
	}
    existedFileLocation, ok := data["existedFileLocation"].(string)
    if !ok {
        fmt.Printf("Error: existedFileId is not a string\n")
        return
    }
    existedFileName, ok := data["existedFileName"].(string)
    if !ok {
        fmt.Printf("Error: existedFileName is not a string\n")
        return
    }

	if !strings.Contains(fileName, fileId) {
		fmt.Printf("Error: fileName does not contain fileId\n")
		return
	}

	noteService := services.NewNoteService()
    result, err := noteService.DeleteExistedFile(existedFileLocation, existedFileName)
	if err != nil {
		fmt.Printf("Error deleting existed file: %v\n", err)
	}
	log.Printf("Delete existed file: %v, filePath: %v", existedFileName, result)

	uploadedFile, err := noteService.UploadNoteFile(noteId, fileName)
	if err != nil {
		fmt.Printf("Error uploading note file: %v\n", err)
	}

	log.Printf("Upload note file result: %v", uploadedFile)
}