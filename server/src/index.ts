import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import * as passport from "passport";
import { User } from "./entity/user/User";
import { encrypt } from "./utils/crypto";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public routes(): void {
    this.app.use("/", routes);
  }

  public config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(passport.initialize());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(helmet());
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server running at http://localhost:%d", this.app.get("port"));
    });
  }
}

const server = new Server();

// Connects to the Database -> then starts the express
createConnection().then(async (connection) => {
  let userRepo = connection.getRepository(User);

  const admin = await userRepo.findOne({ name: 'admin' });

  if(!admin) {
    const user = new User();
    user.name = 'admin';
    user.email = '346762712@qq.com';
    user.password = encrypt('123456');
    user.age = 18;
    user.role = 'ADMIN';
    user.hashPassword();

    userRepo.save(user);

    console.log("create admin user.");
  }


  server.start();
});
