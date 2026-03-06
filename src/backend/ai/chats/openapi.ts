import { AIChat } from "./chat";
import * as http from 'http';
import * as https from 'https';
import { ModelConfig } from "../config";
import { RequestOptions } from "http";

// OpenApiChat 实现
export abstract class OpenApiChat<Req, Res> extends AIChat<Req, Res> {
    constructor(modelConfig: ModelConfig) {
        super(modelConfig);
    }

    httpOption(request: string): RequestOptions {
        const url = new URL(this.modelConfig.url);

        const options: https.RequestOptions = {
            hostname: url.hostname,
            port: url.port || (url.protocol === 'https:' ? 443 : 80),
            path: url.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(request),
                'Authorization': `Bearer ${this.modelConfig.apiKey}`
            }
        };
        return options;
    }

    async callChatAPI(request: Req): Promise<Res> {
        return new Promise((resolve, reject) => {
            const requestStr = JSON.stringify(request);
            console.log('Request:', requestStr);
            const options = this.httpOption(requestStr);
            console.log('Options:', options);

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        const response: Res = JSON.parse(data);
                        resolve(response);
                    } catch (error) {
                        reject(new Error(`Failed to parse response: ${error}`));
                    }
                });
            });

            req.on('error', (error) => {
                reject(new Error(`Request failed: ${error}`));
            });

            req.write(requestStr);
            req.end();
        });
    }
}