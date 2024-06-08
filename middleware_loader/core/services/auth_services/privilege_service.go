package services

import (
	"context"
	"middleware_loader/infrastructure/graph/model"

	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/port/client"
	adapter "middleware_loader/infrastructure/client"
)

type PrivilegeService struct {
}

func NewPrivilegeService() *PrivilegeService {
	return &PrivilegeService{}
}

var privilegeResponse = response_dtos.NewPrivilegeDTO()

func (s *PrivilegeService) GetAllPrivileges(ctx context.Context) ([]model.ListPrivilegeResponse, error) {
	privilege, err := client.IPrivilegeAdapter(&adapter.PrivilegeAdapter{}).GetAllPrivileges()
	if err != nil {
		return nil, err
	}

	privilegesModel := privilegeResponse.MapperListToGraphQLModel(privilege)

	return privilegesModel, nil
}
