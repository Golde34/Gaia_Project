package client_adapter

import (
	"encoding/json"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/infrastructure/client/base"
	"middleware_loader/kernel/utils"
)

type UserGithubAdapter struct { }

func NewUserGithubAdapter() *UserGithubAdapter {
	return &UserGithubAdapter{}
}

func (adapter *UserGithubAdapter) GetUserGithubInfo(userId string) (response_dtos.UserCommitDTO, error) {
	userGithubInfoURL := base.ContributionTrackerURL + "/contribution-tracker/user-commit/get-user-github-info/" + userId
	var userGithubInfo response_dtos.UserCommitDTO 
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.BaseAPI(userGithubInfoURL, "GET", nil, headers)
	if err != nil {
		return response_dtos.UserCommitDTO{}, err
	}

	bodyResultMap, ok := bodyResult.(map[string]interface{})
	if !ok {
		return response_dtos.UserCommitDTO{}, nil
	}

	data, err := json.Marshal(bodyResultMap["userGithubInfo"])
	if err != nil {
		return response_dtos.UserCommitDTO{}, err
	}

	err = json.Unmarshal(data, &userGithubInfo)
	if err != nil {
		return response_dtos.UserCommitDTO{}, err
	}

	return userGithubInfo, nil
}