package services

type PrivilegeService struct {
}

func NewPrivilegeService() *PrivilegeService {
	return &PrivilegeService{}
}

func (s *PrivilegeService) ListAllPrivileges() ([]string, error) {
	return nil, nil
}