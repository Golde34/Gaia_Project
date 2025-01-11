package services

type UserGithubService struct {}

func NewUserGithubService() *UserGithubService {
	return &UserGithubService{}
}

func (s *UserGithubService) GetUserGithubInfo(userId string) (string, error) {
	return "UserGithubInfo", nil
}