package client_adapter

import (
	"encoding/json"
	"fmt"
	"log"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/domain/enums"
	mapper_response "middleware_loader/core/port/mapper/response"
	"middleware_loader/infrastructure/client/base"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
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
	headers := utils.BuildAuthorizationHeaders(enums.AS, "1")
	bodyResult, err := utils.BaseAPI(listAllUsersURL, "GET", nil, headers)
	if err != nil {
		return []response_dtos.UserDTO{}, err
	}

	bodyResultMap, ok := bodyResult.(map[string]interface{})
	if !ok {
		return []response_dtos.UserDTO{}, fmt.Errorf("unexpected response format")
	}
	for _, userElement := range bodyResultMap["message"].([]interface{}) {
		user := mapper_response.ReturnListAllUsersObjectMapper(userElement.(map[string]interface{}))
		users = append(users, *user)
	}

	return users, nil
}

func (adapter *UserAdapter) UpdateUser(input model.UpdateUserInput) (response_dtos.UserDTO, error) {
	updateUserURL := base.AuthServiceURL + "/user/update-user"
	var user response_dtos.UserDTO
	headers := utils.BuildAuthorizationHeaders(enums.AS, "1")
	bodyResult, err := utils.BaseAPI(updateUserURL, "PUT", input, headers)
	if err != nil {
		return response_dtos.UserDTO{}, err
	}

	dataBytes, err := utils.ConvertResponseToMap(bodyResult)
	if err != nil {
		return response_dtos.UserDTO{}, err
	}
	err = json.Unmarshal(dataBytes, &user)
	if err != nil {
		return response_dtos.UserDTO{}, err
	}

	return user, nil
}

func (adapter *UserAdapter) GetUserDetail(input model.IDInput) (response_dtos.UserDetailDTO, error) {
	getUserDetailURL := base.AuthServiceURL + "/user/get-user-by-id?id=" + input.ID
	var user response_dtos.UserDetailDTO
	headers := utils.BuildAuthorizationHeaders(enums.AS, "1")
	bodyResult, err := utils.BaseAPIV2(getUserDetailURL, "GET", input, user, headers)
	if err != nil {
		return response_dtos.UserDetailDTO{}, err
	}
	bodyResultMap, ok := bodyResult.(map[string]interface{})
	if !ok {
		return *response_dtos.NewUserDetailDTO(), nil
	}
	userResponse := mapper_response.ReturnUserObjectMapper(bodyResultMap["message"].(map[string]interface{}))
	log.Println("userResponse", userResponse)
	return *userResponse, nil
}
