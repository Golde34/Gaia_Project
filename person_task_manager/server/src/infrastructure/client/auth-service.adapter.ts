import { ServiceAcronym } from "../../core/domain/enums/enums";
import { buildAuthorizationHeaders } from "../../kernel/util/build-headers";

class AuthServiceAdapter {
    constructor() {}

    async checkExistedUser(userId: number)  {
        const headers = buildAuthorizationHeaders(ServiceAcronym.AS, userId, {});
        const uri = `http://localhost:4001/user/get-user-by-id?id=${userId}`; 
        console.log(`Calling api to auth service: ${uri}`);
        const response = await fetch(uri, {
            headers,
            method: 'GET',
        });
        return response.json();
    }
}

export const authServiceAdapter = new AuthServiceAdapter();
