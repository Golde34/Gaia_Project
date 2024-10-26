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

    if message.Cmd == "uploadFile" {
        data, ok := message.Data.(map[string]interface{})
        if !ok {
            fmt.Printf("Error: message data is not of expected type\n")
            return
        }

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
    } else {
        log.Printf("Message handled successfully, but the cmd does not match 'uploadFile'")
    }
}
