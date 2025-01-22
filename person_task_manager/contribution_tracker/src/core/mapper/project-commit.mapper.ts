import { GithubRepoDto } from "../domain/dtos/github-object.dto";

export const githubRepoMapper = (githubRepo: any): GithubRepoDto => {
    return {
        name: githubRepo.name,
        htmlUrl: githubRepo.html_url,
        description: githubRepo.description,
        owner: githubRepo.owner.login,
        language: githubRepo.language
    }
} 