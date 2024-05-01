package service_registry

type PrivilegeService interface {
	ListAllPrivileges() ([]string, error)
}