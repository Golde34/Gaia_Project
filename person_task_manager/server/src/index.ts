import express, { Application, NextFunction, Request, Response } from "express";
import { config, validateEnvironmentVars } from "./infrastructure/config/configuration";
import { MongoHelper } from "./infrastructure/database/mongodb.db";
import { taskRouter } from "./ui/routers/task.router";
import { groupTaskRouter } from "./ui/routers/group-task.router";
import { authRouter } from "./ui/routers/user_authentication/auth.controller";
import { projectRouter } from "./ui/routers/project.router";
import { subTaskRouter } from "./ui/routers/sub-task.router";
import { commentRouter } from "./ui/routers/comment.router";
import { dashboardRouter } from "./ui/routers/dashboard.router";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

async function main(): Promise<void> {
    validateEnvironmentVars()

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
    const port = process.env.PORT || 3000;

    app.use(
        bodyParser.urlencoded({
            parameterLimit: 100000,
            limit: "50mb",
            extended: true,
        }),
    );
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(cors());
	app.use(helmet());
    app.use(morgan("dev"));

    app.use("/dashboard", dashboardRouter);
    app.use("/auth", authRouter)
    app.use("/project", projectRouter);
    app.use("/group-task", groupTaskRouter);
    app.use("/task", taskRouter);
    app.use("/sub-task", subTaskRouter);
    app.use("/comment", commentRouter);

    app.use((req: Request, res: Response, next: NextFunction) => next(new Error("Not Found")))

    app.listen(config.server.listenPort, () => {
        console.log(`Server running on port ${port}`);
    });

}

main();