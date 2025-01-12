import CacheSingleton from "../../infrastructure/cache/cache-singleton";
import UserCommitRepository from "../../infrastructure/repository/user-commit.repository";
import { InternalCacheConstants } from "../domain/constants/constants";

class UserCommitService {
    constructor(
        private userCommitRepository: UserCommitRepository = UserCommitRepository.getInstance(),
        private userCommitCache = CacheSingleton.getInstance().getCache()
    ) {}

    async getUserGithubInfo(userId: number): Promise<any> {
        try {
            const cachedUserGithubInfo = this.userCommitCache.get(InternalCacheConstants.USER_INFO_CACHE_KEY + userId);
            if (cachedUserGithubInfo) {
                return cachedUserGithubInfo;
            }
            const userGithubInfo = await this.userCommitRepository.findByUserId(userId);
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
}

export const userCommitService = new UserCommitService();