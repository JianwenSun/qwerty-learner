import { ModelConfig } from "../../config";
import { OllamaAIChatRequest } from "../ollama";

export function buildOllamaRequest(systemInput: string, userInput: string, modelConfig: ModelConfig): OllamaAIChatRequest {
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
