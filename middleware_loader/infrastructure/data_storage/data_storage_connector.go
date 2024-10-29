package storages

import (
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"
)

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
	return targetPath, nil
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

func DeleteLocal(fileName string, fileLocation string) (string, error) {
	log.Printf("Deleting file %s from local storage", fileName)
	targetPath := filepath.Join("../data_lake/middleware_loader/", fileName)

	if !strings.EqualFold(targetPath, fileLocation) {
		return "", fmt.Errorf("file location does not match target path")
	}
	err := os.Remove(targetPath)
	if err != nil {
		return "", err
	}

	log.Printf("File deleted from local storage at %s", targetPath)
	return targetPath, nil
}

func DeleteHadoop(fileName, filePath string) (string, error) {
	hadoopClient := NewHadoopAdapter() // Assuming you have an adapter for Hadoop
	err := hadoopClient.DeleteFile(fileName)
	if err != nil {
		return "", fmt.Errorf("error deleting from Hadoop: %v", err)
	}
	log.Printf("File deleted from Hadoop with file name %s", fileName)
	return fileName, nil
}

func DeleteMinio(fileName, filePath string) (string, error) {
	minioClient := NewMinioAdapter() // Assuming you have an adapter for Minio
	err := minioClient.DeleteFile(fileName)
	if err != nil {
		return "", fmt.Errorf("error deleting from Minio: %v", err)
	}
	log.Printf("File deleted from Minio with file name %s", fileName)
	return fileName, nil
}

func DeleteS3(fileName, filePath string) (string, error) {
	s3Client := NewS3Adapter() // Assuming you have an adapter for S3
	err := s3Client.DeleteFile(fileName)
	if err != nil {
		return "", fmt.Errorf("error deleting from S3: %v", err)
	}
	log.Printf("File deleted from S3 with file name %s", fileName)
	return fileName, nil
}

func GetFileFromTempFile(fileName string) (string, error) {
	log.Println("Fetching file from local storage")
	filePath := filepath.Join("./resources/", fileName)
	
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

func GetFileFromLocal(fileName string) (string, error) {
	log.Println("Fetching file from local storage")
	filePath := filepath.Join("../data_lake/middleware_loader/", fileName)

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

func GetFileFromHadoop(fileName string) (string, error) {
	hadoopClient := NewHadoopAdapter() // Assuming you have an adapter for Hadoop
	contentBytes, err := hadoopClient.DownloadFile(fileName)
	if err != nil {
		return "", fmt.Errorf("error downloading from Hadoop: %v", err)
	}
	return string(contentBytes), nil
}

func GetFileFromMinio(fileName string) (string, error) {
	minioClient := NewMinioAdapter() // Assuming you have an adapter for Minio
	contentBytes, err := minioClient.DownloadFile(fileName)
	if err != nil {
		return "", fmt.Errorf("error downloading from Minio: %v", err)
	}
	return string(contentBytes), nil
}

func GetFileFromS3(fileName string) (string, error) {
	s3Client := NewS3Adapter() // Assuming you have an adapter for S3
	contentBytes, err := s3Client.DownloadFile(fileName)
	if err != nil {
		return "", fmt.Errorf("error downloading from S3: %v", err)
	}
	return string(contentBytes), nil
}
