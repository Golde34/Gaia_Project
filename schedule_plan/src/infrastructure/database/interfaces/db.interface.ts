export interface DBHelper {
    host: string;
    port?:number;
    database: string;
    username?: string;
    passwsord?: string;
    connect: () => void;
    disconnect: () => void;
}