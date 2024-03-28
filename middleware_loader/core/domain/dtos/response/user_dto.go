package response_dtos

import "middleware_loader/infrastructure/graph/model"

type UserDTO struct {
	ID         float64       `json:"id"`
	Name       string        `json:"name"`
	Username   string        `json:"username"`
	Email      string        `json:"email"`
	Password   string        `json:"password"`
	LastLogin  string        `json:"lastLogin"`
	Enabled    bool          `json:"enabled"`
	IsUsing2fa bool          `json:"isUsing2FA"`
	Secret     string        `json:"secret"`
	Roles      []interface{} `json:"roles"`
}

func NewUserDTO() *UserDTO {
	return &UserDTO{}
}

func (in *UserDTO) UserMapperToGraphQLModel(input UserDTO) model.User {
	var out model.User
	out.ID = input.ID
	out.Name = input.Name
	out.Username = input.Username
	return out
}

func (in *UserDTO) MapperToGraphQLModel(input UserDTO) model.ListAllUsers {
	var out model.ListAllUsers
	out.ID = input.ID
	out.Name = input.Name
	out.Username = input.Username
	out.Email = input.Email
	out.LastLogin = input.LastLogin
	out.Roles = convertRoles(input.Roles) // Convert []interface{} to []string
	return out
}

func convertRoles(roles []interface{}) []string {
	var out []string
	for _, role := range roles {
		roleMap := role.(map[string]interface{})
		roleName := roleMap["name"].(string)
		out = append(out, roleName)
	}
	return out
}

func (in *UserDTO) MapperListToGraphQLModel(input []UserDTO) []model.ListAllUsers {
	var out []model.ListAllUsers
	for _, item := range input {
		out = append(out, in.MapperToGraphQLModel(item))
	}
	return out
}
