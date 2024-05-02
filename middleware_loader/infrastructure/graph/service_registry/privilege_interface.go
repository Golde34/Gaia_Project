package service_registry

type PrivilegeService interface {
	GetAllPrivileges() ([]string, error)
}