"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/unbound-method */
var express_1 = require("express");
var AdminUserController_1 = require("../controllers/Admin/AdminUserController");
var AuthController_1 = require("../controllers/AuthController");
var AdminRoutes = /** @class */ (function () {
    function AdminRoutes() {
        this.authController = new AuthController_1.default();
        this.router = express_1.Router();
        this.routes();
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    AdminRoutes.prototype.routes = function () {
        // USERS EndPoints
        //
        // Edit One user
        this.router.patch("/users/:id([0-9]+)", this.authController.authorizeJWTAdmin, AdminUserController_1.default.editUser);
        // Get all users
        this.router.get("/users/", this.authController.authorizeJWTAdmin, AdminUserController_1.default.getAllUsers);
        // Delete One user
        this.router.delete("/users/:id([0-9]+)", this.authController.authorizeJWTAdmin, AdminUserController_1.default.deleteUser);
    };
    return AdminRoutes;
}());
exports.AdminRoutes = AdminRoutes;
//# sourceMappingURL=admin.js.map