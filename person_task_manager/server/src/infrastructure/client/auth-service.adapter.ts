import { msg400 } from "../../core/common/response-helpers";
import { BAD_REQUEST } from "../../core/domain/constants/constants";
import { ServiceAcronym } from "../../core/domain/enums/enums";
import { buildAuthorizationHeaders } from "../../kernel/util/build-headers";

class AuthServiceAdapter {
    constructor() { }

    async checkExistedUser(userId: number) {
        try {
            const headers = buildAuthorizationHeaders(ServiceAcronym.AS, userId, {});
            const uri = `http://localhost:4001/user/get-user-by-id?id=${userId}`;
            console.log(`Calling api to auth service: ${uri}`);
            const response = await fetch(uri, {
                headers,
                method: 'GET',
            });
            console.log(response);
            if (response.status !== 200) {
                return BAD_REQUEST;
            }
            return response.json();
        } catch (error: any) {
            console.log("Exception when calling auth service");
            return null;
        }
    }
}

export const authServiceAdapter = new AuthServiceAdapter();
