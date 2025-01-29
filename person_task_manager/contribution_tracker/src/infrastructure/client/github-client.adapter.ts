import * as dotenv from 'dotenv';

dotenv.config({ path: './src/.env' })

class GithubClientAdapter {
    private githubTokenUrl: string;
    private githubUserInfoUrl: string;
    private githubRepositoriesUrl: string;
    private githubCommitsUrl: string 

    constructor() {
        this.githubTokenUrl = process.env.GITHUB_TOKEN_URL ?? "https://github.com/login/oauth/access_token",
        this.githubUserInfoUrl = process.env.GITHUB_USER_INFO_URL ?? "https://api.github.com/user",
        this.githubRepositoriesUrl = process.env.GITHUB_REPOSITORIES_URL ?? "https://api.github.com/user/repos",
        this.githubCommitsUrl = process.env.GITHUB_COMMITS_URL ?? "https://api.github.com/repos/{githubLoginName}/{repoName}/commits"
    }

    private async callGithubApi(url: string, method: string, body: any, accessToken: string | null): Promise<any> {
        try {
            const headers: Record<string, string> = accessToken ? {
                Authorization: `token ${accessToken}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            } : {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
            const response = await fetch(url, {
                headers: headers,
                method: method,
                body: body ? JSON.stringify(body) : undefined
            });
            if (response.status !== 200) {
                console.error(`Github API returned status: ${response.status}`);
                return null;
            }

            const data = await response.json();
            if (data.error) {
                console.error(`Error from Github API: ${data.error}`);
                return null;
            }
            return data;
        } catch (error: any) {
            console.error("Exception when calling Github API", error);
            return null;
        }
    }

    async getGithubAccessToken(body: any): Promise<string | null> {
        try {
            console.log('Github token url: ', this.githubTokenUrl);
            const data = await this.callGithubApi(this.githubTokenUrl, 'POST', body, null);
            return data.access_token;
        } catch (error: any) {
            console.error("Exception when calling Github API", error);
            return null;
        }
    }

    async getGithubUserInfo(accessToken: string): Promise<any> {
        try {
            return await this.callGithubApi(this.githubUserInfoUrl, 'GET', null, accessToken);
        } catch (error: any) {
            console.error("Exception when calling Github API", error);
            return null;
        }
    }

    async getGithubRepositories(accessToken: string): Promise<any> {
        try {
            return await this.callGithubApi(this.githubRepositoriesUrl, 'GET', null, accessToken);
        } catch (error: any) {
            console.error("Exception when calling Github API", error);
            return null;
        }
    }

    async getGithubCommits(githubLoginName: string, accessToken: string, repoName: string): Promise<any> {
        try {
            const url = this.githubCommitsUrl.replace("{githubLoginName}", githubLoginName).replace("{repoName}", repoName);
            return await this.callGithubApi(url, 'GET', null, accessToken);
        } catch (error: any) {
            console.error("Exception when calling Github API", error);
            return null;
        }
    }

    async getLastGithuCommit(githubLoginName: string, accessToken: string, repoName: string): Promise<any> {
        try {
            const url = this.githubCommitsUrl.replace("{githubLoginName}", githubLoginName).replace("{repoName}", repoName);
            const commits = await this.callGithubApi(url, 'GET', null, accessToken);
            return commits[0];
        } catch (error: any) {
            console.error("Exception when calling Github API", error);
            return null;
        }
    }

    // async getGithubAccessToken(body: any): Promise<string | null> {
    //     try {
    //         console.log('Github token url: ', this.githubTokenUrl);
    //         const response = await fetch(this.githubTokenUrl, {
    //             method: "POST",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(body)
    //         });
    //         if (response.status !== 200) {
    //             console.error(`Github API returned status: ${response.status}`);
    //             return null;
    //         }

    //         const data = await response.json();
    //         if (data.error) {
    //             console.error(`Error from Github API: ${data.error}`);
    //             return null;
    //         }
    //         return data.access_token;
    //     } catch (error: any) {
    //         console.error("Exception when calling Github API", error);
    //         return null;
    //     }
    // }

    // async getGithubUserInfo(accessToken: string): Promise<any> {
    //     try {
    //         const response = await fetch("https://api.github.com/user", {
    //             headers: {
    //                 Authorization: `token ${accessToken}`,
    //             },
    //         });
    //         if (response.status !== 200) {
    //             console.error(`Github API returned status: ${response.status}`);
    //             return null;
    //         }

    //         const data = await response.json();
    //         if (data.error) {
    //             console.error(`Error from Github API: ${data.error}`);
    //             return null;
    //         }
    //         return data;
    //     } catch (error: any) {
    //         console.error("Exception when calling Github API", error);
    //         return null;
    //     }
    // }

    // async getGithubRepositories(accessToken: string): Promise<any> {
    //     try {
    //         const response = await fetch("https://api.github.com/user/repos", {
    //             headers: {
    //                 Authorization: `token ${accessToken}`,
    //             },
    //         });
    //         if (response.status !== 200) {
    //             console.error(`Github API returned status: ${response.status}`);
    //             return null;
    //         }

    //         const data = await response.json();
    //         if (data.error) {
    //             console.error(`Error from Github API: ${data.error}`);
    //             return null;
    //         }
    //         return data;
    //     } catch (error: any) {
    //         console.error("Exception when calling Github API", error);
    //         return null;
    //     }
    // }

    // async getGithubCommits(accessToken: string, repoName: string): Promise<any> {
    //     try {
    //         const response = await fetch(`https://api.github.com/repos/golde34/${repoName}/commits`, {
    //             headers: {
    //                 Authorization: `token ${accessToken}`,
    //             },
    //         });
    //         if (response.status !== 200) {
    //             console.error(`Github API returned status: ${response.status}`);
    //             return null;
    //         }

    //         const data = await response.json();
    //         if (data.error) {
    //             console.error(`Error from Github API: ${data.error}`);
    //             return null;
    //         }
    //         return data;
    //     } catch (error: any) {
    //         console.error("Exception when calling Github API", error);
    //         return null;
    //     }
    // }

}

export const githubClientAdapter = new GithubClientAdapter();