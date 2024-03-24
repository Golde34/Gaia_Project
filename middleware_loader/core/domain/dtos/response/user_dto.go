package response_dtos

import (
	"log"
	"middleware_loader/infrastructure/graph/model"
)

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

func (in *UserDTO) MapperToGraphQLModel(input UserDTO) model.ListAllUsers {
	var out model.ListAllUsers
	out.ID = input.ID
	out.Name = input.Name
	out.Username = input.Username
	out.LastLogin = input.LastLogin
	out.Roles = convertRoles(input.Roles) // Convert []interface{} to []string
	return out
}

func convertRoles(roles []interface{}) []string {
	var out []string
	for _, role := range roles {
		roleMap := role.(map[string]interface{})
		log.Println("roleMap: ", roleMap)
		roleName := roleMap["name"].(string)
		log.Println("roleName: ", roleName)
		out = append(out, roleName)
	}
	log.Println("out: ", out)
	return out
}

func (in *UserDTO) MapperListToGraphQLModel(input []UserDTO) []model.ListAllUsers {
	var out []model.ListAllUsers
	for _, item := range input {
		out = append(out, in.MapperToGraphQLModel(item))
	}
	return out
}
