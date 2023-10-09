import express, { Application, NextFunction, Request, Response } from "express";
import { config, validateEnvironmentVars } from "./config/configuration";
import { MongoHelper } from "./database/mongodb.db";
import { taskRouter } from "./modules/person_task_manager/controllers/task.controller";
import { groupTaskRouter } from "./modules/person_task_manager/controllers/group-task.controller";
import { authService } from "./modules/user_authentication/auth.service";
import { authRouter } from "./modules/user_authentication/auth.controller";
import jwt from "jsonwebtoken";

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

  // default route if have no authen then redirect to login page
  // else project page
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Lấy token từ tiêu đề Authorization
    const token = req.headers['authorization'];

    if (token == null) {
      return res.sendStatus(401); // Unauthorized
    }

    // Xác thực token
    jwt.verify(token, 'GAIA3401', (err, user: any) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.body = user; // Lưu thông tin người dùng từ token vào request
      next();
    });
  };

  // Dịch vụ cần xác thực
  app.get('/protected-service', authenticateToken, (req: any, res: any) => {
    // Bây giờ bạn có thể sử dụng thông tin người dùng từ req.user
    console.log('User ID:', req.user.userId);
    console.log('Username:', req.user.username);

    // Phục vụ dịch vụ của bạn ở đây
    res.json({ message: 'Dịch vụ được bảo vệ' });
  });
  
  app.use("/auth", authRouter)
  app.use("/task", taskRouter)
  app.use("/group-task", groupTaskRouter)
  app.use((req: Request, res: Response, next: NextFunction) => next(new Error("Not Found")))

  app.listen(config.server.listenPort, () => {
    console.log(`Server running on port ${port}`);
  });

}

main();