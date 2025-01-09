import { DBHelper } from "./interfaces/db.interface";
import mysql from "mysql2";

export class MySQLHelper implements DBHelper {
    constructor(
        public host: string,
        public port: number,
        public database: string,
        public username: string,
        public password: string
    ) { }

    connect(): void {
        try {
            mysql.createConnection({
                host: this.host,
                user: this.username,
                password: this.password,
                database: this.database
            });  
        } catch (error) {
            console.log(error);
        }
    }

    disconnect(): void {
        throw new Error("Method not implemented.");
    }
}


// export default mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// });