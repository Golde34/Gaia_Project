package services

import (
	// response_dtos "middleware_loader/core/domain/dtos/response"
// 	"middleware_loader/core/port/client"
// 	adapter "middleware_loader/infrastructure/client"
)

type PrivilegeService struct {
}

func NewPrivilegeService() *PrivilegeService {
	return &PrivilegeService{}
}

// var privilegeResponse = response_dtos.NewPrivilegeDTO()

func (s *PrivilegeService) GetAllPrivileges() ([]string, error) {
	// privilege, err := client.IPrivilegeAdapter(&adapter.PrivilegeAdapter{}).GetAllPrivileges()
	// if err != nil {
	// 	return nil, err
	// }

	// privilegesModel := privilegeResponse.MapperListToGraphQLModel(privilege)

	// return privilegesModel, nil
	return nil, nil
}