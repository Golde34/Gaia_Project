package storages

// Adapter Minio
type MinioAdapter struct{}

func NewMinioAdapter() *MinioAdapter {
	return &MinioAdapter{}
}

func (m *MinioAdapter) UploadFile(fileName string, content []byte) error {
	// Code upload lên Minio
	return nil
}

// Adapter Hadoop
type HadoopAdapter struct{}

func NewHadoopAdapter() *HadoopAdapter {
	return &HadoopAdapter{}
}

func (h *HadoopAdapter) UploadFile(filePath, fileName string) error {
	// Code upload lên Hadoop
	return nil
}

// Adapter S3
type S3Adapter struct{}

func NewS3Adapter() *S3Adapter {
	return &S3Adapter{}
}

func (s *S3Adapter) UploadFile(fileName string, content []byte) error {
	// Code upload lên S3
	return nil
}