package storages

import (
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
)

func findTempFile(fileName string) (string){
	return "./resources/" + fileName
}

func UploadToLocal(fileName, filePath string) (string, error) {
	log.Printf("Uploading file %s to local storage", fileName)
	targetPath := filepath.Join("../data_lake/middleware_loader/", fileName)
	
	inputFile, err := os.Open(filePath)
	if err != nil {
		return "", err
	}
	defer inputFile.Close()

	outputFile, err := os.Create(targetPath)
	if err != nil {
		return "", err
	}
	defer outputFile.Close()

	_, err = io.Copy(outputFile, inputFile)
	if err != nil {
		return "", err
	}

	log.Printf("File uploaded to local storage at %s", targetPath)
	return fileName, nil
}

// UploadToHadoop uploads a file to Hadoop
func UploadToHadoop(fileName, filePath string) (string, error) {
	hadoopClient := NewHadoopAdapter() // Assuming you have an adapter for Hadoop
	err := hadoopClient.UploadFile(filePath, fileName)
	if err != nil {
		return "", fmt.Errorf("error uploading to Hadoop: %v", err)
	}
	log.Printf("File uploaded to Hadoop with file name %s", fileName)
	return fileName, nil
}

// UploadToMinio uploads a file to Minio
func UploadToMinio(fileName, filePath string) (string, error) {
	minioClient := NewMinioAdapter() // Assuming you have an adapter for Minio
	fileContent, err := os.ReadFile(filePath)
	if err != nil {
		return "", fmt.Errorf("error reading file for Minio upload: %v", err)
	}
	err = minioClient.UploadFile(fileName, fileContent)
	if err != nil {
		return "", fmt.Errorf("error uploading to Minio: %v", err)
	}
	log.Printf("File uploaded to Minio with file name %s", fileName)
	return fileName, nil
}

// UploadToS3 uploads a file to Amazon S3
func UploadToS3(fileName, filePath string) (string, error) {
	s3Client := NewS3Adapter() // Assuming you have an adapter for S3
	fileContent, err := os.ReadFile(filePath)
	if err != nil {
		return "", fmt.Errorf("error reading file for S3 upload: %v", err)
	}
	err = s3Client.UploadFile(fileName, fileContent)
	if err != nil {
		return "", fmt.Errorf("error uploading to S3: %v", err)
	}
	log.Printf("File uploaded to S3 with file name %s", fileName)
	return fileName, nil
}