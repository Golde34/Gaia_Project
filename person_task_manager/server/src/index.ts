import express, { Application, Request, Response } from "express";
import { config, validateEnvironmentVars } from "./config/configuration";
import { MongoHelper } from "./database/mongodb.db";


async function main(): Promise<void> {
  // validateEnvironmentVars()

  // const mongoHelper = new MongoHelper(
  //   config.database.host,
  //   config.database.port,
  //   config.database.name,
  //   config.database.username,
  //   config.database.password,
  // )
  // await mongoHelper.connect();

  const app: Application = express();
  const port = process.env.PORT || 3000;

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

main();