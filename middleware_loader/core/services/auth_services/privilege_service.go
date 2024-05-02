package services

type PrivilegeService struct {
}

func NewPrivilegeService() *PrivilegeService {
	return &PrivilegeService{}
}

func (s *PrivilegeService) GetAllPrivileges() ([]string, error) {
	return nil, nil
}