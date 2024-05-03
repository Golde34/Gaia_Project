package service_registry

import "context"

type PrivilegeService interface {
	GetAllPrivileges(ctx context.Context) ([]string, error)
}