import { IResponse } from "../common/response";
import { msg200, msg400 } from "../common/response-helpers";
import { userCommitService } from "../service/user-commit.service";

class UserCommitUsecase {
    constructor(
        public userCommitServiceImpl = userCommitService,
    ) { }

    async getUserGithubInfo(userId: number): Promise<IResponse> {
        try {
            const userGithubInfo = await this.userCommitServiceImpl.getUserGithubInfo(userId);
            return msg200({
                userGithubInfo: userGithubInfo
            })
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async verifyGithubAuthorization(code: string, state: string): Promise<IResponse> {
        try {
            const userGithubInfo = await this.userCommitServiceImpl.verifyGithubAuthorization(code, state);
            return msg200({
                userGithubInfo: userGithubInfo
            })
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }
}

export const userCommitUsecase = new UserCommitUsecase();