package adapter

import (
	"fmt"
	"log"
	response_dtos "middleware_loader/core/domain/dtos/response"
	mapper_response "middleware_loader/core/port/mapper/response"
	"middleware_loader/infrastructure/adapter/base"
)

type UserAdapter struct {
	adapter *UserAdapter
}

func NewUserAdapter(adapter *UserAdapter) *UserAdapter {
	return &UserAdapter{adapter: adapter}
}

func (adapter *UserAdapter) ListAllUsers() ([]response_dtos.UserDTO, error) {
	listAllUsersURL := base.AuthServiceURL + "/user/get-all-users"
	var users []response_dtos.UserDTO
	log.Println("listAllUsersURL: ", listAllUsersURL)

	bodyResult, err := base.BaseAPI(listAllUsersURL, "GET", nil)
	if err != nil {
		return []response_dtos.UserDTO{}, err
	}

	log.Println("bodyResult: ", bodyResult)

	bodyResultMap, ok := bodyResult.(map[string]interface{})
	if !ok {
		return []response_dtos.UserDTO{}, fmt.Errorf("unexpected response format")
	}
	for _, userElement := range bodyResultMap["message"].([]interface{}) {
		user := mapper_response.ReturnListAllUsersObjectMapper(userElement.(map[string]interface{}))
		users = append(users, *user)
	}
	log.Print("users: ", users)
	return users, nil
}
