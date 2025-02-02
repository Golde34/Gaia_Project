package response_dtos

type UserCommitDTO struct {
	Id              string  `json:"id"`
	UserId          float64 `json:"userId"`
	GithubUrl       string  `json:"githubUrl"`
	GithubLoginName string  `json:"githubLoginName"`
	UserConsent     float64 `json:"userConsent"`
	UserState       string  `json:"userState"`
}

func NewUserCommitDTO() *UserCommitDTO {
	return &UserCommitDTO{}
}

type GithubConfigurationDTO struct {
	ClientId    string `json:"clientId"`
	RedirectUrl string `json:"redirectUrl"`
}

func NewGithubConfigurationDTO() *GithubConfigurationDTO {
	return &GithubConfigurationDTO{}
}

type UserGithubDTO struct {
	UserGithubInfo      UserCommitDTO          `json:"userGithubInfo"`
	GithubConfiguration GithubConfigurationDTO `json:"githubConfiguration"`
}

func NewUserGithubDTO() *UserGithubDTO {
	return &UserGithubDTO{}
}
