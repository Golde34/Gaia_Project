import CacheSingleton from "../../infrastructure/cache/cache-singleton";
import UserCommitRepository from "../../infrastructure/repository/user-commit.repository";
import { InternalCacheConstants } from "../domain/constants/constants";

class UserCommitService {
    constructor(
        private userCommitRepository: UserCommitRepository = UserCommitRepository.getInstance(),
        private userCommitCache = CacheSingleton.getInstance().getCache()
    ) { }

    async getUserGithubInfo(userId: number): Promise<any> {
        try {
            console.log("Getting user info: " + userId);
            const cachedUserGithubInfo = this.userCommitCache.get(InternalCacheConstants.USER_INFO_CACHE_KEY + userId);
            if (cachedUserGithubInfo) {
                console.log("Returning cached user info");
                return cachedUserGithubInfo;
            }
            console.log("Returning user info from db");
            const userGithubInfo = await this.userCommitRepository.findByUserId(userId);
            console.log("User info: ", userGithubInfo);
            this.userCommitCache.set(InternalCacheConstants.USER_INFO_CACHE_KEY + userId, userGithubInfo);
            return userGithubInfo;
        } catch (error) {
            console.error("Error on getUserGithubInfo: ", error);
            return null;
        }
    }

    async clearUserCache(userId: number): Promise<void> {
        this.userCommitCache.clear(InternalCacheConstants.USER_INFO_CACHE_KEY + userId);
    }

    async verifyGithubAuthorization(code: string, state: string): Promise<any> {
        try {
            console.log("Verifying github authorization");
            const userGithubInfo = await this.userCommitRepository.verifyGithubAuthorization(code, state);
            this.clearUserCache(userGithubInfo.userId);
            console.log("User info: ", userGithubInfo);
            return userGithubInfo;
        } catch (error) {
            console.error("Error on verifyGithubAuthorization: ", error);
            return null;
        }
    }
}

export const userCommitService = new UserCommitService();