package service_registry

type RoleService interface {
	ListAllRoles() ([]string, error)
}