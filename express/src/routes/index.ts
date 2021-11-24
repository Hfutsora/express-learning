import { Router } from "express";
import { UserRoutes } from "./user";

const routes = Router();

routes.use("/user", new UserRoutes().router);

export default routes;
