package controller_utils

import (
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
)

const uploadPath = "./resources"

func ReceiveMultipartFile(r *http.Request, w http.ResponseWriter) (string, error) {
	err := r.ParseMultipartForm(10 << 20) // 10 MB limit
	if err != nil {
		return "Unable to parse form", err
	}	

	// Extract the file from the form data
	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusBadRequest)
	}
	defer file.Close()

	return SaveToTempFile(file, handler)	
}

func SaveToTempFile(file multipart.File, handler *multipart.FileHeader) (string, error) {
	// Create the uploads directory if it doesn't exist
	if _, err := os.Stat(uploadPath); os.IsNotExist(err) {
		err := os.MkdirAll(uploadPath, os.ModePerm)
		if err != nil {
			return "", err
		}
	}

	// Save the uploaded file to the server
	filePath := filepath.Join(uploadPath, handler.Filename)
	dst, err := os.Create(filePath)
	if err != nil {
		return "", err
	}
	defer dst.Close()

	// Copy the uploaded file data to the created file on the server
	if _, err := io.Copy(dst, file); err != nil {
		return "", err
	}

	return filePath, nil
}
