package services

import (
	"context"
	response_dtos "middleware_loader/core/domain/dtos/response"
	"middleware_loader/core/port/client"
	adapter "middleware_loader/infrastructure/client"
	"middleware_loader/infrastructure/graph/model"
)

type ProjectCommitService struct{}

func NewProjectCommitService() *ProjectCommitService {
	return &ProjectCommitService{}
}

func (s *ProjectCommitService) GetGithubRepos(context context.Context, input model.IDInput) ([]model.GithubRepo, error) {
	repos, err := client.IProjectAdapter(&adapter.ProjectAdapter{}).GetGithubRepos(input.ID)
	if err != nil {
		return nil, err
	}
	reposModel := response_dtos.NewGithubRepoResponseDTO().MapperListToGraphQLModel(repos)

	return reposModel, nil
}

func (s *ProjectCommitService) GetProjectCommits(context context.Context, input model.IDInput) ([]model.ProjectCommit, error) {
	projectCommits, err := client.IProjectAdapter(&adapter.ProjectAdapter{}).GetProjectCommits(input.ID)
	if err != nil {
		return nil, err
	}
	projectCommitsModel := response_dtos.NewProjectCommitResponseDTO().MapperListToGraphQLModel(projectCommits)

	return projectCommitsModel, nil
}