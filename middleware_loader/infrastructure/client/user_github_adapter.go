package client_adapter

import (
	"encoding/json"
	"middleware_loader/infrastructure/client/base"
	"middleware_loader/kernel/utils"
)

type UserGithubAdapter struct { }

func NewUserGithubAdapter() *UserGithubAdapter {
	return &UserGithubAdapter{}
}

func (adapter *UserGithubAdapter) GetUserGithubInfo(userId string) (string, error) {
	userGithubInfoURL := base.ContributionTrackerURL + "/contribution-tracker/user-commit/get-user-github-info/" + userId
	var userGithubInfo string
	headers := utils.BuildDefaultHeaders()
	bodyResult, err := utils.BaseAPI(userGithubInfoURL, "GET", nil, headers)
	if err != nil {
		return "", err
	}

	data, err := json.Marshal(bodyResult)
	if err != nil {
		return "", err
	}

	err = json.Unmarshal(data, &userGithubInfo)
	if err != nil {
		return "", err
	}

	return userGithubInfo, nil
}