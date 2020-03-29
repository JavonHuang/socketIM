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
Object.defineProperty(exports, "__esModule", { value: true });
var redis = require("redis"), client = redis.createClient('6379', '127.0.0.1', { auth_pass: null, db: 1 });
client.on("error", function (err) {
    console.log("redis: " + err);
    process.exit();
});
/**
 * 记录自增量
 * @param key 自增key;mgsId:消息编码;conversationId:会话编码;groupId:群组编码;id:系统用户编码
 */
var inrcCache = function (key) {
    return new Promise(function (resolve, reject) {
        try {
            client.incr(key, function (err, res) {
                resolve(1);
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
/**
 * 根据key 获取自增量,自增key;mgsId:消息编码;conversationId:会话编码;groupId:群组编码;id:系统用户编码
 * @param key
 * @returns value
 */
var getCacheById = function (key) {
    return new Promise(function (resolve, reject) {
        try {
            client.get(key, function (err, reply) {
                resolve(reply);
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
/**
 * 根据key 删除自增量
 * @param key redis key
 */
var deleteCacheById = function (key) {
    return new Promise(function (resolve, reject) {
        try {
            client.del(key, function (err, reply) {
                resolve(1);
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
/**
 * 根据key 重置自增量
 * @param key redis key
 */
var resetCacheById = function (key) {
    return new Promise(function (resolve, reject) {
        try {
            client.getset(key, 0, function (err, reply) {
                resolve(1);
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
/**
 * 根据key 添加socket对应关系
 * @param key redis key
 * @param value 更新值
 */
var updateCache = function (key, value) {
    return new Promise(function (resolve, reject) {
        try {
            client.getset(key, value, function (err, res) {
                resolve(1);
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
/**
 * 根据id和key更新value
 * @param id redis id
 * @param key 对应的key值
 */
var updatehCache = function (id, key, value) {
    return new Promise(function (resolve, reject) {
        try {
            client.hset(id, key, value, function (err, res) {
                resolve(1);
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
/**
 * 根据id和key获取value
 * @param id redis id
 * @param key 对应的key值
 * @returns value
 */
var gethCacheById = function (id, key) {
    return new Promise(function (resolve, reject) {
        try {
            client.hmget(id, key, function (err, res) {
                resolve(res[0]);
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
/**
 * 根据id和key所有缓存key
 * @param id redis id
 * @returns key array
 */
var gethAllCache = function (id) {
    return new Promise(function (resolve, reject) {
        try {
            client.hkeys(id, function (err, res) {
                resolve(res);
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
/**
 * 根据key获取流水号
 * @param key 自增key;userid:消息编码;conversationId-C:会话编码;groupId-G:群组编码;gmgsId-M:群组消息编码;id:系统用户编码-U
 * @param prefix 序号前缀
 */
var getNumberByKey = function (key, prefix) { return __awaiter(void 0, void 0, void 0, function () {
    var number;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inrcCache(key)];
            case 1:
                _a.sent();
                return [4 /*yield*/, getCacheById(key)];
            case 2:
                number = _a.sent();
                return [2 /*return*/, prefix + Number(number)];
        }
    });
}); };
exports.getNumberByKey = getNumberByKey;
var delhCacheById = function (id, key) {
    return new Promise(function (resolve, reject) {
        try {
            client.hdel(id, key, function (err, res) {
                resolve(res[0]);
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
//# sourceMappingURL=redis.js.map