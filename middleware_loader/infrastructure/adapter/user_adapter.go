package adapter

import (
	"fmt"
	"log"
	"middleware_loader/infrastructure/adapter/base"
	"middleware_loader/infrastructure/graph/model"
)

type UserAdapter struct {
	adapter *UserAdapter
}

func NewUserAdapter(adapter *UserAdapter) *UserAdapter {
	return &UserAdapter{adapter: adapter}
}

func (adapter *UserAdapter) ListAllUsers() ([]model.User, error) {
	listAllUsersURL := base.AuthServiceURL + "/user/get-all-users"
	var users []model.User
	log.Println("listAllUsersURL: ", listAllUsersURL)

	bodyResult, err := base.BaseAPI(listAllUsersURL, "GET", nil)
	if err != nil {
		return []model.User{}, err
	}

	log.Println("bodyResult: ", bodyResult)

	bodyResultMap, ok := bodyResult.(map[string]interface{})
	if !ok {
		return []model.User{}, fmt.Errorf("unexpected response format")
	}
	for _, userElement := range bodyResultMap["message"].([]interface{}) {
		log.Println("lastLogin: ", userElement.(map[string]interface{})["lastLogin"])
		var lastLogin string
		if userElement.(map[string]interface{})["lastLogin"] == nil {
			lastLogin = ""
		} else {
			lastLogin = userElement.(map[string]interface{})["lastLogin"].(string)
		}
		user := model.User{
			ID:       userElement.(map[string]interface{})["id"].(float64),
			Username: userElement.(map[string]interface{})["username"].(string),
			Name:     userElement.(map[string]interface{})["name"].(string),
			LastLogin: lastLogin,
		}
		users = append(users, user)
	}
	log.Print("users: ", users)
	return users, nil
}
