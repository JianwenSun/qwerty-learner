import { ModelConfig } from "../config";
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// 抽象类 AIChat
export abstract class AIChat<Req, Res> {
    protected modelConfig: ModelConfig;

    constructor(modelConfig: ModelConfig) {
        this.modelConfig = modelConfig;
    }

    async cacheCallChatApi(request: Req): Promise<Res> {
        // 生成缓存键
        const cacheKey = this.generateCacheKey(request);
        const cachePath = path.join(__dirname, '../../../../tmp', `${cacheKey}.json`);

        // 检查缓存是否存在
        if (fs.existsSync(cachePath)) {
            console.log('Using cached response');
            const cachedData = fs.readFileSync(cachePath, 'utf8');
            return JSON.parse(cachedData) as Res;
        }

        // 调用API
        const response = await this.callChatAPI(request);

        // 缓存结果
        fs.writeFileSync(cachePath, JSON.stringify(response, null, 2));
        console.log('Cached response');

        return response;
    }

    private generateCacheKey(request: Req): string {
        // 将请求对象转换为字符串
        const requestStr = JSON.stringify(request);
        // 使用MD5生成缓存键
        return crypto.createHash('md5').update(requestStr).digest('hex');
    }

    abstract callChatAPI(request: Req): Promise<Res>;
}