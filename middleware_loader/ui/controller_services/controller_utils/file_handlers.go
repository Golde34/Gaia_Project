package controller_utils

import (
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"

	"github.com/google/uuid"
)

const uploadPath = "./resources"

func ReceiveMultipartFile(r *http.Request, w http.ResponseWriter) (string, string, string, error) {
	err := r.ParseMultipartForm(10 << 20) // 10 MB limit
	if err != nil {
		return "Unable to parse form", "", "", err 
	}	

	// Extract the file from the form data
	file, handler, err := r.FormFile("file")
	if err != nil {
		return "Error retrieving the file", "", "", err 
	}
	defer file.Close()

	return SaveToTempFile(file, handler)	
}

func SaveToTempFile(file multipart.File, handler *multipart.FileHeader) (string, string, string, error) {
	if _, err := os.Stat(uploadPath); os.IsNotExist(err) {
		err := os.MkdirAll(uploadPath, os.ModePerm)
		if err != nil {
			return "", "", "", err 
		}
	}

	fileID := uuid.New().String()
	fileName := fileID + "_" + handler.Filename
	filePath := filepath.Join(uploadPath, fileName)
	dst, err := os.Create(filePath)
	if err != nil {
		return "", "", "", err 
	}
	defer dst.Close()

	if _, err := io.Copy(dst, file); err != nil {
		return "", "", "", err 
	}

	return filePath, fileID, fileName, err 
}
