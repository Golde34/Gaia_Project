package consumer 

import "fmt"

type UploadNoteFileHandler struct{}

func (h *UploadNoteFileHandler) HandleMessage(topic string, key, value []byte) error {
    fmt.Printf("Handling message for topic %s: %s\n", topic, string(value))
	fmt.Println("UploadNoteFileHandler: chung ta cung da tung")
	return nil
}