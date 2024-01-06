package services

type MiddlewareService struct {}

func NewMiddlewareService() *MiddlewareService {
	return &MiddlewareService{}
}

func (s *MiddlewareService) MicroservicesStatus() (string, error) {
	return "MicroservicesStatus", nil
}