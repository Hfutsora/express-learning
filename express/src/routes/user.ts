import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthController from "../controllers/AuthController";

export class UserRoutes {
  public router: Router;
  public authController: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/info", this.authController.authenticateJWT, UserController.getOwnUser);

    // Get one user
    this.router.get("/:id([0-9]+)", this.authController.authenticateJWT, UserController.getOneById);
    // Login route
    this.router.post("/login", UserController.login);
    // Register
    this.router.post("/create", UserController.newUser);
  }
}
