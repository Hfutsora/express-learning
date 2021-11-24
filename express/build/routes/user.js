"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/unbound-method */
var express_1 = require("express");
var UserController_1 = require("../controllers/UserController");
var AuthController_1 = require("../controllers/AuthController");
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
        this.authController = new AuthController_1.default();
        this.router = express_1.Router();
        this.routes();
    }
    UserRoutes.prototype.routes = function () {
        // Get own user
        this.router.get("/me", this.authController.authenticateJWT, UserController_1.default.getOwnUser);
        // Delete own user
        this.router.delete("/me", this.authController.authenticateJWT, UserController_1.default.deleteUser);
        // Edit own user
        this.router.patch("/me", this.authController.authenticateJWT, UserController_1.default.editOwnUser);
        // Get one user
        this.router.get("/:id([0-9]+)", this.authController.authenticateJWT, UserController_1.default.getOneById);
        // Change my password
        this.router.post("/change-password", this.authController.authenticateJWT, UserController_1.default.changePassword);
        // Login route
        this.router.post("/login", UserController_1.default.login);
        // Register
        this.router.post("/create", UserController_1.default.newUser);
    };
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.js.map