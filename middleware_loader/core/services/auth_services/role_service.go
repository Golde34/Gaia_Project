package services

type RoleService struct {
}

func NewRoleService() *RoleService {
	return &RoleService{}
}

func (s *RoleService) ListAllRoles() ([]string, error) {
	return nil, nil
}