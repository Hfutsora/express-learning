"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("./user");
var admin_1 = require("./admin");
var routes = express_1.Router();
// routes.use("/auth", auth);
routes.use("/user", new user_1.UserRoutes().router);
routes.use("/admin", new admin_1.AdminRoutes().router);
exports.default = routes;
//# sourceMappingURL=index.js.map