"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOllamaRequest = buildOllamaRequest;
function buildOllamaRequest(systemInput, userInput, modelConfig) {
    return {
        messages: [
            {
                role: 'system',
                content: systemInput
            },
            {
                role: 'user',
                content: userInput
            }
        ],
        options: {
            temperature: 0, // 降低温度以获得更一致的结果
            num_ctx: 4096
        }
    };
}
