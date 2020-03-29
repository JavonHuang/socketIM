"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = __importStar(require("koa"));
var koa_controllers_1 = require("koa-controllers");
var Authenticate_1 = require("./../Authenticate");
var messageResult_1 = require("./../../unitls/messageResult");
var proxyVerify_1 = require("./../verifyData/proxyVerify");
var userVerify = __importStar(require("./../verifyData/user/userVerify"));
var userInfoVerify = __importStar(require("./../verifyData/user/userInfoVerify"));
var userBLL = __importStar(require("../../BLL/user/userBll"));
var userInfoBll = __importStar(require("../../BLL/user/userInfoBll"));
var userModel = __importStar(require("../../model/user/user"));
var MainController = /** @class */ (function () {
    function MainController() {
    }
    /**
    *
    * @param ctx 用户注册
    */
    MainController.prototype.userRegistered = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var req, reqBody1, reqBody2, vali1, validatorNext1, _validator1, vali2, validatorNext2, _validator2, _a, e_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 4]);
                        req = ctx;
                        reqBody1 = req.request.body;
                        reqBody2 = req.request.body;
                        vali1 = proxyVerify_1.validator({}, userInfoVerify.updateUserInfo_Role, reqBody1);
                        validatorNext1 = userInfoVerify.updateUserInfo_Role.validatorNext;
                        _validator1 = validatorNext1(vali1, reqBody1);
                        _validator1.next();
                        // !vali1.userid || _validator1.next();
                        !vali1.nickname || _validator1.next();
                        !vali1.img || _validator1.next();
                        !vali1.sex || _validator1.next();
                        !vali1.age || _validator1.next();
                        !vali1.signature || _validator1.next();
                        vali2 = proxyVerify_1.validator({}, userVerify.user_login_verify_role, reqBody2);
                        validatorNext2 = userVerify.user_login_verify_role.validatorNext;
                        _validator2 = validatorNext2(vali2, reqBody2);
                        _validator2.next();
                        // !vali2.userid || _validator2.next();
                        !vali2.password || _validator2.next();
                        _a = ctx;
                        return [4 /*yield*/, userBLL.userRegistered(reqBody2, reqBody1)];
                    case 1:
                        _a.body = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_1 = _c.sent();
                        _b = ctx;
                        return [4 /*yield*/, new messageResult_1.messageResult(100, false, null).getMsg(e_1.message)];
                    case 3:
                        _b.body = _c.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    *
    * @param ctx 根据用户账号更新用户信息
    */
    MainController.prototype.updateUserInfoByUserId = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var req, reqBody, vali, validatorNext, _validator, _a, e_2, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 4]);
                        req = ctx;
                        reqBody = req.request.body;
                        vali = proxyVerify_1.validator({}, userInfoVerify.updateUserInfo_Role, reqBody);
                        validatorNext = userInfoVerify.updateUserInfo_Role.validatorNext;
                        _validator = validatorNext(vali, reqBody);
                        _validator.next();
                        !vali.userid || _validator.next();
                        !vali.nickname || _validator.next();
                        !vali.img || _validator.next();
                        !vali.sex || _validator.next();
                        !vali.age || _validator.next();
                        !vali.signature || _validator.next();
                        _a = ctx;
                        return [4 /*yield*/, userInfoBll.updateUserInfoByUserId(reqBody)];
                    case 1:
                        _a.body = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_2 = _c.sent();
                        _b = ctx;
                        return [4 /*yield*/, new messageResult_1.messageResult(100, false, null).getMsg(e_2.message)];
                    case 3:
                        _b.body = _c.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    *
    * @param ctx 根据用户账号获取用户信息
    */
    MainController.prototype.getUserInfoByUserId = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var req, reqBody, _a, e_3, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 4]);
                        req = ctx;
                        reqBody = req.request.body;
                        if (reqBody.userid == null || reqBody.userid == '') {
                            throw new Error('verify:userid can’t null or ""');
                        }
                        _a = ctx;
                        return [4 /*yield*/, userInfoBll.getUserInfoByUserId(reqBody.userid)];
                    case 1:
                        _a.body = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_3 = _c.sent();
                        _b = ctx;
                        return [4 /*yield*/, new messageResult_1.messageResult(100, false, null).getMsg(e_3.message)];
                    case 3:
                        _b.body = _c.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param ctx 用户修改密码
     */
    MainController.prototype.updatePassword = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var req, reqBody, vali, validatorNext, _validator, queryInf, _a, e_4, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 4]);
                        req = ctx;
                        reqBody = req.request.body;
                        vali = proxyVerify_1.validator({}, userVerify.updatePassword_verify_role, reqBody);
                        validatorNext = userVerify.updatePassword_verify_role.validatorNext;
                        _validator = validatorNext(vali, reqBody);
                        _validator.next();
                        !vali.userid || _validator.next();
                        !vali.password || _validator.next();
                        !vali.oldpassword || _validator.next();
                        queryInf = new userModel.updateUser(reqBody.userid, reqBody.password, reqBody.oldpassword);
                        _a = ctx;
                        return [4 /*yield*/, userBLL.updatePassword(queryInf)];
                    case 1:
                        _a.body = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_4 = _c.sent();
                        _b = ctx;
                        return [4 /*yield*/, new messageResult_1.messageResult(100, false, null).getMsg(e_4.message)];
                    case 3:
                        _b.body = _c.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 用户登录
     * @param ctx
     */
    MainController.prototype.login = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var req, reqBody, vali, validatorNext, _validator, queryInf, _a, e_5, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 4]);
                        req = ctx;
                        reqBody = req.request.body;
                        vali = proxyVerify_1.validator({}, userVerify.user_login_verify_role, reqBody);
                        validatorNext = userVerify.user_login_verify_role.validatorNext;
                        _validator = validatorNext(vali, reqBody);
                        _validator.next();
                        !vali.userid || _validator.next();
                        !vali.password || _validator.next();
                        queryInf = new userModel.user(reqBody.userid, reqBody.password);
                        _a = ctx;
                        return [4 /*yield*/, userBLL.getUser(queryInf)];
                    case 1:
                        _a.body = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_5 = _c.sent();
                        _b = ctx;
                        return [4 /*yield*/, new messageResult_1.messageResult(100, false, null).getMsg(e_5.message)];
                    case 3:
                        _b.body = _c.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        koa_controllers_1.Post('/user/userRegistered'),
        __param(0, koa_controllers_1.Ctx),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MainController.prototype, "userRegistered", null);
    __decorate([
        koa_controllers_1.Post('/user/updateUserInfoByUserId'),
        koa_controllers_1.Before(Authenticate_1.Authenticate),
        __param(0, koa_controllers_1.Ctx),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MainController.prototype, "updateUserInfoByUserId", null);
    __decorate([
        koa_controllers_1.Post('/user/getUserInfoByUserId'),
        koa_controllers_1.Before(Authenticate_1.Authenticate),
        __param(0, koa_controllers_1.Ctx),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MainController.prototype, "getUserInfoByUserId", null);
    __decorate([
        koa_controllers_1.Post('/user/updatePassword'),
        koa_controllers_1.Before(Authenticate_1.Authenticate),
        __param(0, koa_controllers_1.Ctx),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MainController.prototype, "updatePassword", null);
    __decorate([
        koa_controllers_1.Post('/user/login'),
        __param(0, koa_controllers_1.Ctx),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MainController.prototype, "login", null);
    MainController = __decorate([
        koa_controllers_1.Controller
    ], MainController);
    return MainController;
}());
exports.default = MainController;
//# sourceMappingURL=userController.js.map