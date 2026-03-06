import { AIChat } from './chats/chat';
import { getNextModel } from './config';
import type { ModelConfig } from './config';
import { OllamaChat } from './chats/ollama';
import { DoubaoSpeedV2Chat } from './chats/speedv2';
import { buildRequest } from './chats/builder';
import { handleChatResponse } from './chats/handler';

// 工厂函数，根据模型配置创建相应的 AIChat 实例
function createAIChat(modelConfig: ModelConfig): AIChat<any, any> {
  // 根据模型配置的 provider 字段判断使用哪种实现
  if (modelConfig.provider === 'ollama') {
    return new OllamaChat(modelConfig) as AIChat<any, any>;
  } else if (modelConfig.provider === 'openapi' && modelConfig.model.type === 'speedv2') {
    return new DoubaoSpeedV2Chat(modelConfig) as AIChat<any, any>;
  } else {
    // 默认使用 OllamaChat
    return new OllamaChat(modelConfig) as AIChat<any, any>;
  }
}

export async function callChat(systemInput: string, userInput: string): Promise<string> {
  const modelConfig = getNextModel();
  const aiChat = createAIChat(modelConfig);
  const request = buildRequest(systemInput, userInput, modelConfig);
  const response = await aiChat.cacheCallChatApi(request);
  const chatResponse = handleChatResponse(response, modelConfig);
  return chatResponse.message;
}