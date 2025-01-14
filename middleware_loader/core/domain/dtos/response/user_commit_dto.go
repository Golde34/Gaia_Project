package response_dtos

type UserCommitDTO struct {
	Id          float64 `json:"id"`
	UserId      float64 `json:"userId"`
	GithubUrl   string  `json:"githubUrl"`
	UserConsent float64 `json:"userConsent"`
	UserState   string  `json:"userState"`
}

func NewUserCommitDTO() *UserCommitDTO {
	return &UserCommitDTO{}
}
