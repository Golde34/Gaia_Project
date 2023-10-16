export class AuthServiceGrpcClient {
    
    private grpc = require('@grpc/grpc-js');
    private protoLoader = require('@grpc/proto-loader');
    private PROTO_PATH = __dirname + '/auth.proto';
    
    async checkJwt(access_token: string) {
        return new Promise((resolve, reject) => {
            const packageDefinition = this.protoLoader.loadSync(this.PROTO_PATH, {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
            const protoDescriptor = this.grpc.loadPackageDefinition(packageDefinition);
            const auth = protoDescriptor.auth;
            const client = new auth.AuthService('localhost:50051', this.grpc.credentials.createInsecure());
            client.checkJwt({ access_token }, (err: any, response: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    }

    async checkAccountPermission(accountId: number, permission: string) {
        return new Promise((resolve, reject) => {
            const packageDefinition = this.protoLoader.loadSync(this.PROTO_PATH, {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
            const protoDescriptor = this.grpc.loadPackageDefinition(packageDefinition);
            const auth = protoDescriptor.auth;
            const client = new auth.AuthService('localhost:50051', this.grpc.credentials.createInsecure());
            client.checkAccountPermission({ account_id: accountId, permission }, (err: any, response: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    }

    async viewAccountInformation(accountId: number) {
        return new Promise((resolve, reject) => {
            const packageDefinition = this.protoLoader.loadSync(this.PROTO_PATH, {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            }); 
            const protoDescriptor = this.grpc.loadPackageDefinition(packageDefinition);
            const auth = protoDescriptor.auth;
            const client = new auth.AuthService('localhost:50051', this.grpc.credentials.createInsecure());
            client.viewAccountInformation({ account_id: accountId }, (err: any, response: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    }

    async UpdateAccountInformation(accountId: number, username?: string, email?: string) {
        return new Promise((resolve, reject) => {
            const packageDefinition = this.protoLoader.loadSync(this.PROTO_PATH, {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            }); 
            const protoDescriptor = this.grpc.loadPackageDefinition(packageDefinition);
            const auth = protoDescriptor.auth;
            const client = new auth.AuthService('localhost:50051', this.grpc.credentials.createInsecure());
            client.updateAccountInformation({ account_id: accountId, username, email }, (err: any, response: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    }
}

export const authServiceGrpcClient = new AuthServiceGrpcClient();