"use strict";
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
var messageResult_1 = require("../../unitls/messageResult");
var token = __importStar(require("../../unitls/token"));
var redis = __importStar(require("./../../unitls/redis"));
var userDal = __importStar(require("../../DAL/user/userDal"));
var userInfoDal = __importStar(require("../../DAL/user/userInfoDal"));
var DBfactory = __importStar(require("../../DBunity/DBfactory"));
/**
 * 用户登录验证
 * @param queryInfo 用户登录信息
 */
var getUser = function (queryInfo) { return __awaiter(void 0, void 0, void 0, function () {
    var result, tokenStr, obj, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 8]);
                return [4 /*yield*/, userDal.getUser(queryInfo.userid)];
            case 1:
                result = _a.sent();
                if (!(result.length > 0)) return [3 /*break*/, 3];
                tokenStr = token.generateToken(result[0]);
                obj = {
                    userInfo: result[0],
                    token: tokenStr.data
                };
                return [4 /*yield*/, new messageResult_1.messageResult(200, true, obj).getMsg()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3: return [4 /*yield*/, new messageResult_1.messageResult(10000, false, null).getMsg()];
            case 4: return [2 /*return*/, _a.sent()];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_1 = _a.sent();
                return [4 /*yield*/, new messageResult_1.messageResult(100, false, null).getMsg(e_1.message)];
            case 7: return [2 /*return*/, _a.sent()];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
/**
 * 修改密码
 * @param updateUser
 */
var updatePassword = function (updateUser) { return __awaiter(void 0, void 0, void 0, function () {
    var count, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 10]);
                return [4 /*yield*/, userDal.verifyOldPassword(updateUser)];
            case 1:
                count = _a.sent();
                if (!(count.length > 0 && count[0].count > 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, userDal.updatePassword(updateUser)];
            case 2:
                result = _a.sent();
                if (!(result.warningCount === 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, new messageResult_1.messageResult(200, true, null).getMsg()];
            case 3: return [2 /*return*/, _a.sent()];
            case 4: return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, new messageResult_1.messageResult(10001, false, null).getMsg()];
            case 6: return [2 /*return*/, _a.sent()];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_2 = _a.sent();
                return [4 /*yield*/, new messageResult_1.messageResult(100, false, null).getMsg(e_2.message)];
            case 9: return [2 /*return*/, _a.sent()];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.updatePassword = updatePassword;
/**
 * 用户注册
 * @param user
 * @param userInfo
 */
var userRegistered = function (user, userInfo) { return __awaiter(void 0, void 0, void 0, function () {
    var db, userId, userResult, userInfoResult, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 15, , 18]);
                db = new DBfactory.transaction();
                return [4 /*yield*/, redis.getNumberByKey('userid', 10000000)];
            case 1:
                userId = _a.sent();
                user.userid = userId;
                userInfo.userid = userId;
                return [4 /*yield*/, db.beginTransaction()];
            case 2:
                _a.sent();
                return [4 /*yield*/, userDal.insertUser(user, db)];
            case 3:
                userResult = _a.sent();
                if (!(userResult.warningCount === 0)) return [3 /*break*/, 11];
                return [4 /*yield*/, userInfoDal.insertUserInfo(userInfo, db)];
            case 4:
                userInfoResult = _a.sent();
                if (!(userInfoResult.warningCount === 0)) return [3 /*break*/, 7];
                return [4 /*yield*/, db.commit()];
            case 5:
                _a.sent();
                return [4 /*yield*/, new messageResult_1.messageResult(200, true, userInfo).getMsg()];
            case 6: return [2 /*return*/, _a.sent()];
            case 7: return [4 /*yield*/, db.rollBack()];
            case 8:
                _a.sent();
                return [4 /*yield*/, new messageResult_1.messageResult(10003, false, null).getMsg()];
            case 9: return [2 /*return*/, _a.sent()];
            case 10: return [3 /*break*/, 14];
            case 11: return [4 /*yield*/, db.rollBack()];
            case 12:
                _a.sent();
                return [4 /*yield*/, new messageResult_1.messageResult(10003, false, null).getMsg()];
            case 13: return [2 /*return*/, _a.sent()];
            case 14: return [3 /*break*/, 18];
            case 15:
                e_3 = _a.sent();
                return [4 /*yield*/, db.rollBack()];
            case 16:
                _a.sent();
                return [4 /*yield*/, new messageResult_1.messageResult(100, false, null).getMsg(e_3.message)];
            case 17: return [2 /*return*/, _a.sent()];
            case 18: return [2 /*return*/];
        }
    });
}); };
exports.userRegistered = userRegistered;
//# sourceMappingURL=userBll.js.map