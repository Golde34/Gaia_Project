package response_dtos

type UserCommitDTO struct {
	Id          float64  `json:"id"`
	UserId      float64 `json:"userId"`
	GithubUrl   string  `json:"githubUrl"`
	GithubSha   string  `json:"githubSha"`
	UserConsent float64 `json:"userConsent"`
}

func NewUserCommitDTO() *UserCommitDTO {
	return &UserCommitDTO{}
}
