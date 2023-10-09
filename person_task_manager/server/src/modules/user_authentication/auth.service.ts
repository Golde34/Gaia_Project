import axios from "axios";
import { config } from "../../config/configuration";
import { msg200 } from "../../common/response_helpers";
import { IResponse } from "../../common/response";

export class AuthService {
    
    constructor(
        private readonly authServerHost: string,
        private readonly authServerPort: number,
    ){
        this.authServerHost = config.authServer.host;
        this.authServerPort = config.authServer.port;
    } 

    async test(token: string): Promise<IResponse> {
        const response = await axios.get(`http://${this.authServerHost}:${this.authServerPort}/auth/user`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return msg200(response.data);
    }

}

export const authService = new AuthService(config.authServer.host, config.authServer.port);