package response_dtos

import (
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
)

type RoleDTO struct {
	ID          float64       `json:"id"`
	Name        string        `json:"name"`
	Description *string       `json:"description"`
	Privileges  []interface{} `json:"privileges"`
}

func NewRoleDTO() *RoleDTO {
	return &RoleDTO{}
}

func (in *RoleDTO) MapperToGraphQLModel(input RoleDTO) model.Role {
	var out model.Role
	out.ID = input.ID
	out.Name = input.Name
	out.Description = input.Description
	out.Privileges = convertPrivileges(input.Privileges)
	return out
}

func (in *RoleDTO) MapperListToGraphQLModel(input []RoleDTO) []model.Role {
	var out []model.Role
	for _, item := range input {
		out = append(out, in.MapperToGraphQLModel(item))
	}
	return out
}

func convertPrivileges(privileges []interface{}) []*model.Privilege {
	var out []*model.Privilege
	for _, privilege := range privileges {
		privilegeMap := privilege.(map[string]interface{})
		privilegeId := privilegeMap["id"].(float64)
		privilegeName := privilegeMap["name"].(string)
		privilegeDescription := utils.CheckNullPointer(privilegeMap["description"])
		out = append(out, &model.Privilege{
			ID:          privilegeId,
			Name:        privilegeName,
			Description: privilegeDescription,
		})
	}
	return out
}