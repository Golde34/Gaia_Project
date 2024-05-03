package response_dtos

import (
	"middleware_loader/infrastructure/graph/model"
	// "middleware_loader/kernel/utils"
)

type PrivilegeDTO struct {
	ID          float64       `json:"id"`
	Name        string        `json:"name"`
	Description *string       `json:"description"`
	Roles       []interface{} `json:"roles"`
}

func NewPrivilegeDTO() *PrivilegeDTO {
	return &PrivilegeDTO{}
}

func (in *PrivilegeDTO) MapperToGraphQLModel(input PrivilegeDTO) model.Privilege {
	var out model.Privilege
	out.ID = input.ID
	out.Name = input.Name
	out.Description = input.Description
	// out.Roles = convertRoles(input.Roles)
	return out
}

func (in *PrivilegeDTO) MapperListToGraphQLModel(input []PrivilegeDTO) []model.Privilege {
	var out []model.Privilege
	for _, item := range input {
		out = append(out, in.MapperToGraphQLModel(item))
	}
	return out
}

// func convertRoles(roles []interface{}) []*model.Role {
// 	var out []*model.Role
// 	for _, role := range roles {
// 		roleMap := role.(map[string]interface{})
// 		roleId := roleMap["id"].(float64)
// 		roleName := roleMap["name"].(string)
// 		roleDescription := utils.CheckNullPointer(roleMap["description"])
// 		out = append(out, &model.Role{
// 			ID:          roleId,
// 			Name:        roleName,
// 			Description: roleDescription,
// 		})
// 	}
// 	return out
// }