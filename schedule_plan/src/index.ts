import express, { Application, NextFunction, Request, Response } from "express";
import { config, validateEnvironmentVars } from "./kernel/config/configuration";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { MongoHelper } from "./kernel/database/mongodb.db";

async function main(): Promise<void> {
    validateEnvironmentVars();

    const mongoHelper = new MongoHelper(
        config.database.host,
        config.database.port,
        config.database.name,
        config.database.username,
        config.database.password,
    )
    await mongoHelper.connect();
    console.log("Connected to MongoDB");

    const app: Application = express();
    const port = config.server.listenPort;

    app.use(
        bodyParser.urlencoded({
            parameterLimit: 100000,
            limit: '50mb',
            extended: true,
        }),
    );
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));

    app.get("/status", (req: Request, res: Response) => {
        res.status(200).send("OK");
    })

    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new Error("Not Found"));
    });

    app.listen(config.server.listenPort, () => {
        console.log(`Server is running on port ${config.server.listenPort}`);
    })
}

main();