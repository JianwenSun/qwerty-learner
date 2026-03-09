"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callChat = callChat;
const config_1 = require("./config");
const ollama_1 = require("./chats/ollama");
const speedv2_1 = require("./chats/speedv2");
const builder_1 = require("./chats/builder");
const handler_1 = require("./chats/handler");
// 工厂函数，根据模型配置创建相应的 AIChat 实例
function createAIChat(modelConfig) {
    // 根据模型配置的 provider 字段判断使用哪种实现
    if (modelConfig.provider === 'ollama') {
        return new ollama_1.OllamaChat(modelConfig);
    }
    else if (modelConfig.provider === 'openapi' && modelConfig.model.type === 'speedv2') {
        return new speedv2_1.DoubaoSpeedV2Chat(modelConfig);
    }
    else {
        // 默认使用 OllamaChat
        return new ollama_1.OllamaChat(modelConfig);
    }
}
async function callChat(systemInput, userInput) {
    const modelConfig = (0, config_1.getNextModel)();
    const aiChat = createAIChat(modelConfig);
    const request = (0, builder_1.buildRequest)(systemInput, userInput, modelConfig);
    const response = await aiChat.cacheCallChatApi(request);
    const chatResponse = (0, handler_1.handleChatResponse)(response, modelConfig);
    return chatResponse.message;
}
