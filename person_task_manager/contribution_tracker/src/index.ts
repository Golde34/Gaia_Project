import express, { Application, NextFunction, Request, Response } from "express";
import { config, validateEnvironmentVars } from "./kernel/config/general.configuration";
import { dbConfig, validateDBEnvironmentVars } from "./kernel/config/database.configuration";
import { MySQLHelper } from "./infrastructure/database/mysql.db";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { msg200, msg405, sendResponse } from "./core/common/response-helpers";
import { commitRouter } from "./ui/rest/router/commit.router";

async function main(): Promise<void> {
    validateEnvironmentVars()
    validateDBEnvironmentVars()

    const mysqlHelper = new MySQLHelper (
        dbConfig.database.host,
        dbConfig.database.port,
        dbConfig.database.name,
        dbConfig.database.username,
        dbConfig.database.password,
    )
    mysqlHelper.connect()

    const app: Application = express()
    const port = process.env.LISTEN_PORT || 3003

    app.use(
        bodyParser.urlencoded({
            parameterLimit: 100000,
            limit: '50mb',
            extended: true
        }),
    );
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))

    app.get("/status", (req: Request, res: Response) => {
        res.status(200).send(msg200("3003"))
    })
    app.use("/commit", commitRouter);

    app.use((req: Request, res: Response, next: NextFunction) => {
        sendResponse(msg405("MEthod Not Allowed"), res, next);
    });

    app.listen(config.server.listenPort, () => {
        console.log(`Server is running on port ${port}`)
    });
}

main();