package controller_utils

import (
	"io"
	base_dtos "middleware_loader/core/domain/dtos/base"
	"middleware_loader/kernel/configs"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/google/uuid"
)

const uploadPath = "./resources"

func ReceiveMultipartFile(r *http.Request, w http.ResponseWriter) (string, base_dtos.FileObject, error) {
	err := r.ParseMultipartForm(10 << 20) // 10 MB limit
	if err != nil {
		return "Unable to parse form", base_dtos.FileObject{}, err 
	}	

	// Extract the file from the form data
	file, handler, err := r.FormFile("file")
	if err != nil {
		return "Error retrieving the file", base_dtos.FileObject{}, err 
	}
	defer file.Close()

	return SaveToTempFile(file, handler)	
}

func SaveToTempFile(file multipart.File, handler *multipart.FileHeader) (string, base_dtos.FileObject, error) {
	if _, err := os.Stat(uploadPath); os.IsNotExist(err) {
		err := os.MkdirAll(uploadPath, os.ModePerm)
		if err != nil {
			return "", base_dtos.FileObject{}, err
		}
	}

	fileContent, err := io.ReadAll(file)
	if err != nil {
		return "", base_dtos.FileObject{}, err
	}

	fileObject, fileName, err := createFileObject(fileContent, handler)
	if err != nil {
		return "", base_dtos.FileObject{}, err
	}

	filePath := filepath.Join(uploadPath, fileName)
	dst, err := os.Create(filePath)
	if err != nil {
		return "", base_dtos.FileObject{}, err
	}
	defer dst.Close()

	if _, err := dst.Write(fileContent); err != nil {
		return "", base_dtos.FileObject{}, err
	}

	return filePath, fileObject, nil
}

func createFileObject(fileContent []byte, handler *multipart.FileHeader) (base_dtos.FileObject, string, error) {
	fileID := uuid.New().String()
	fileName := fileID + "_" + handler.Filename

	summaryDisplayText := getSummaryDisplayText(fileContent)

	return base_dtos.FileObject{
		FileId:      fileID,
		FileName:    fileName,
		FileContent: summaryDisplayText,
	}, fileName, nil
}

func getSummaryDisplayText(fileContent []byte) string {
	contentString := string(fileContent)
	words := strings.Fields(contentString)
	limitedWords := words
	var config = configs.Config{}
	var env, _ = config.LoadEnv()
	fileDisplayWord, ok := strconv.Atoi(env.FileDisplayWord)
	if ok != nil {
		fileDisplayWord = 50
	}
	if (len(words) > fileDisplayWord) {
		limitedWords = words[:fileDisplayWord]
	}
	summaryDisplayText := strings.Join(limitedWords, " ")
	return summaryDisplayText
}
