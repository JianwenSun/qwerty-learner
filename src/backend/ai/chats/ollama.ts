import { ModelConfig } from "../config";
import { AIChat } from "./chat";
import * as http from 'http';

export interface OllamaAIChatRequest {
    messages: {
        role: string;
        content: string;
    }[];
    options: {
        temperature: number;
        num_ctx: number;
        stop?: string[];
    };
}

interface OllamaAIChatResponse {
    model: string;
    created_at: string;
    message: {
        role: string;
        content: string;
    };
    done: boolean;
    done_reason?: string;
    total_duration?: number;
    load_duration?: number;
    prompt_eval_count?: number;
    prompt_eval_duration?: number;
    eval_count?: number;
    eval_duration?: number;
}


// OllamaChat 实现
export class OllamaChat extends AIChat<OllamaAIChatRequest, OllamaAIChatResponse> {
    constructor(modelConfig: ModelConfig) {
        super(modelConfig);
    }

    async callChatAPI(request: OllamaAIChatRequest): Promise<OllamaAIChatResponse> {
        return new Promise((resolve, reject) => {
            console.log('Using Ollama model:', this.modelConfig.name);

            // 解析模型 URL
            const url = new URL(this.modelConfig.url);
            const postData = JSON.stringify({
                ...request,
                model: this.modelConfig.model
            });

            const options: http.RequestOptions = {
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

            let fullResponse: OllamaAIChatResponse | null = null;
            let fullContent = '';
            const req = http.request(options, (res) => {
                res.on('data', (chunk) => {
                    // 打印 chunk 内容
                    console.log('Received chunk:', chunk.toString());

                    // 直接解析每个 chunk 的 JSON 结构
                    try {
                        const response = JSON.parse(chunk.toString()) as OllamaAIChatResponse;
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
                    } catch (error) {
                        console.error('Error parsing Ollama response chunk:', error);
                    }
                });
                res.on('end', () => {
                    console.log('Full content:', fullContent);
                    if (fullResponse && fullResponse.message) {
                        // 确保返回的响应对象包含完整的内容
                        fullResponse.message.content = fullContent;
                        resolve(fullResponse);
                    } else {
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