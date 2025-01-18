import * as dotenv from 'dotenv';

dotenv.config({ path: './src/.env' })

class GithubClientAdapter {
    private githubTokenUrl: string;

    constructor() {
        this.githubTokenUrl = process.env.GITHUB_TOKEN_URL ?? "https://github.com/login/oauth/access_token"
    }

    async getGithubAccessToken(body: any): Promise<string | null> {
        try {
            console.log('Github token url: ', this.githubTokenUrl);
            const response = await fetch(this.githubTokenUrl, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
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
            return data.access_token;
        } catch (error: any) {
            console.error("Exception when calling Github API", error);
            return null;
        }
    }

    async getGithubUserInfo(accessToken: string): Promise<any> {
        try {
            const response = await fetch("https://api.github.com/user", {
                headers: {
                    Authorization: `token ${accessToken}`,
                },
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

    async getGithubRepositories(accessToken: string): Promise<any> {
        try {
            const response = await fetch("https://api.github.com/user/repos", {
                headers: {
                    Authorization: `token ${accessToken}`,
                },
            });
            if (response.status) {
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
            console.error("Exception when calling github API", error);
            return null;
        }
    }

    async getGithubCommits(accessToken: string, repoName: string): Promise<any> {
        try {
            const response = await fetch(`https://api.github.com/repos/${repoName}/commits`, {
                headers: {
                    Authorization: `token ${accessToken}`,
                },
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
}

export default GithubClientAdapter;