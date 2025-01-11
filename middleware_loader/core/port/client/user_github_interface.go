package client

type IUserGithubAdapter interface {
	GetUserGithubInfo(userId string) (string, error)
}