"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIChat = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
// 抽象类 AIChat
class AIChat {
    modelConfig;
    constructor(modelConfig) {
        this.modelConfig = modelConfig;
    }
    async cacheCallChatApi(request) {
        // 生成缓存键
        const cacheKey = this.generateCacheKey(request);
        const cachePath = path.join(__dirname, '../../../../tmp', `${cacheKey}.json`);
        // 检查缓存是否存在
        if (fs.existsSync(cachePath)) {
            console.log('Using cached response');
            const cachedData = fs.readFileSync(cachePath, 'utf8');
            return JSON.parse(cachedData);
        }
        // 调用API
        const response = await this.callChatAPI(request);
        // 缓存结果
        fs.writeFileSync(cachePath, JSON.stringify(response, null, 2));
        console.log('Cached response');
        return response;
    }
    generateCacheKey(request) {
        // 将请求对象转换为字符串
        const requestStr = JSON.stringify(request);
        // 使用MD5生成缓存键
        return crypto.createHash('md5').update(requestStr).digest('hex');
    }
}
exports.AIChat = AIChat;
