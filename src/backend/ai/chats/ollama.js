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
exports.OllamaChat = void 0;
const chat_1 = require("./chat");
const http = __importStar(require("http"));
// OllamaChat 实现
class OllamaChat extends chat_1.AIChat {
    constructor(modelConfig) {
        super(modelConfig);
    }
    async callChatAPI(request) {
        return new Promise((resolve, reject) => {
            console.log('Using Ollama model:', this.modelConfig.name);
            // 解析模型 URL
            const url = new URL(this.modelConfig.url);
            const postData = JSON.stringify({
                ...request,
                model: this.modelConfig.model
            });
            const options = {
                hostname: url.hostname,
                port: url.port || (url.protocol === 'https:' ? 443 : 80),
                path: url.pathname,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };
            // 如果模型配置中有 API Key，则添加到请求头
            if (this.modelConfig.apiKey && options.headers) {
                options.headers['Authorization'] = `Bearer ${this.modelConfig.apiKey}`;
            }
            let fullResponse = null;
            let fullContent = '';
            const req = http.request(options, (res) => {
                res.on('data', (chunk) => {
                    // 打印 chunk 内容
                    console.log('Received chunk:', chunk.toString());
                    // 直接解析每个 chunk 的 JSON 结构
                    try {
                        const response = JSON.parse(chunk.toString());
                        // 保存完整的响应对象
                        fullResponse = response;
                        if (response.message && response.message.content) {
                            fullContent += response.message.content;
                            console.log('Added content:', response.message.content);
                        }
                        // 检查是否完成
                        if (response.done) {
                            console.log('Response completed');
                        }
                    }
                    catch (error) {
                        console.error('Error parsing Ollama response chunk:', error);
                    }
                });
                res.on('end', () => {
                    console.log('Full content:', fullContent);
                    if (fullResponse && fullResponse.message) {
                        // 确保返回的响应对象包含完整的内容
                        fullResponse.message.content = fullContent;
                        resolve(fullResponse);
                    }
                    else {
                        reject(new Error('Failed to get valid response from Ollama API'));
                    }
                });
            });
            req.on('error', (error) => {
                console.error('Request error:', error);
                reject(error);
            });
            console.log('Sending request to Ollama API...');
            console.log('Request data:', postData);
            req.write(postData);
            req.end();
        });
    }
}
exports.OllamaChat = OllamaChat;
