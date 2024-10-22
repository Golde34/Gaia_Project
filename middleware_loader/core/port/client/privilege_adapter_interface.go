package client

import response_dtos "middleware_loader/core/domain/dtos/response"

type IPrivilegeAdapter interface {
	GetAllPrivileges() ([]response_dtos.PrivilegeDTO, error)
}