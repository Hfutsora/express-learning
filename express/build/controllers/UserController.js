"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var config_1 = require("../config/config");
var User_1 = require("../entity/User");
var jwt = require("jsonwebtoken");
var jwtDecode = require("jwt-decode");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    // Authentication
    // eslint-disable-next-line @typescript-eslint/require-await
    UserController.signJWT = function (user) { return __awaiter(_this, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            token = jwt.sign({
                userId: user.id,
                provider: user.provider,
                providerId: user.providerId,
                email: user.email,
                displayName: user.displayName,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
            }, config_1.default.jwtSecret, {
                expiresIn: config_1.default.expiration,
                issuer: config_1.default.issuer,
                audience: config_1.default.audience,
            });
            return [2 /*return*/, token];
        });
    }); };
    UserController.login = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, password, userRepository, user, error_1, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    if (!(email && password)) {
                        res.status(400).send();
                    }
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail({ where: { email: email } })];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    res.status(401).send();
                    return [3 /*break*/, 4];
                case 4:
                    // Check if encrypted password match
                    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
                        res.status(401).send();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, UserController.signJWT(user)];
                case 5:
                    token = _b.sent();
                    // Send the jwt in the response
                    return [2 /*return*/, res.send({ token: token })];
            }
        });
    }); };
    UserController.changePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var token, id, _a, oldPassword, newPassword, userRepository, user, error_2, errors;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = jwtDecode(req.headers.authorization);
                    id = token.userId;
                    _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                    if (!(oldPassword && newPassword)) {
                        res.status(400).send();
                    }
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    res.status(401).send();
                    return [3 /*break*/, 4];
                case 4:
                    // Check if old password matchs
                    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
                        res.status(401).send("Invalid password or wrong email!");
                        return [2 /*return*/];
                    }
                    // Validate de model (password lenght)
                    user.password = newPassword;
                    return [4 /*yield*/, class_validator_1.validate(user)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        res.status(400).send(errors);
                        return [2 /*return*/];
                    }
                    // Hash the new password and save
                    user.hashPassword();
                    userRepository.save(user);
                    return [2 /*return*/, res.status(204).send()];
            }
        });
    }); };
    // Create & Update
    UserController.newUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, password, firstName, lastName, displayName, user, errors, userRepository, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password, firstName = _a.firstName, lastName = _a.lastName, displayName = _a.displayName;
                    user = new User_1.User();
                    user.provider = "CODETEK";
                    user.providerId = "1";
                    user.email = email;
                    user.displayName = displayName;
                    user.password = password;
                    user.role = "USER";
                    user.firstName = firstName;
                    user.lastName = lastName;
                    return [4 /*yield*/, class_validator_1.validate(user)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        res.status(400).send(errors);
                        return [2 /*return*/];
                    }
                    // Hash the password, to securely store on DB
                    user.hashPassword();
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, userRepository.save(user)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _b.sent();
                    res.status(409).send("email already in use");
                    return [2 /*return*/];
                case 5: 
                // If all ok, send 201 response
                return [2 /*return*/, res.status(201).send("User created")];
            }
        });
    }); };
    UserController.editOwnUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var token, id, _a, displayName, email, firstName, lastName, userRepository, user, error_3, errors, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = jwtDecode(req.headers.authorization);
                    id = token.userId;
                    _a = req.body, displayName = _a.displayName, email = _a.email, firstName = _a.firstName, lastName = _a.lastName;
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    // If not found, send a 404 response
                    res.status(404).send("User not found");
                    return [2 /*return*/];
                case 4:
                    // Validate the new values on model
                    user.email = email;
                    user.displayName = displayName;
                    user.firstName = firstName;
                    user.lastName = lastName;
                    return [4 /*yield*/, class_validator_1.validate(user)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        res.status(400).send(errors);
                        return [2 /*return*/];
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, userRepository.save(user)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_2 = _b.sent();
                    res.status(409).send("email already in use");
                    return [2 /*return*/];
                case 9:
                    delete user.password;
                    // After all send a 204 (no content, but accepted) response
                    return [2 /*return*/, res.status(200).send(user)];
            }
        });
    }); };
    UserController.deleteUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var token, id, userRepository, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = jwtDecode(req.headers.authorization);
                    id = token.userId;
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    res.status(404).send("User not found");
                    return [2 /*return*/];
                case 4:
                    userRepository.delete(id);
                    // After all send a 204 (no content, but accepted) response
                    return [2 /*return*/, res.status(204).send()];
            }
        });
    }); };
    // Get user by ID
    UserController.getOneById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, userRepository, user, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id);
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id, {
                            // We dont want to send the passwords on response
                            select: ["id", "provider", "providerId", "email", "displayName", "role", "firstName", "lastName"],
                        })];
                case 2:
                    user = _a.sent();
                    return [2 /*return*/, res.status(200).send(user)];
                case 3:
                    error_5 = _a.sent();
                    return [2 /*return*/, res.status(404).send("User not found")];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    UserController.getOwnUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var token, id, userRepository, user, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = jwtDecode(req.headers.authorization);
                    id = token.userId;
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id, {
                            // We dont want to send the passwords on response
                            select: ["id", "provider", "providerId", "email", "displayName", "role", "firstName", "lastName"],
                        })];
                case 2:
                    user = _a.sent();
                    res.status(200).send(user);
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    res.status(404).send("User not found");
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=UserController.js.map