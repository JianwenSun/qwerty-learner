import { ModelConfig } from "../../config";
import { DoubaoSpeedV2AIChatResponse } from "../speedv2";


export interface ChatResponse {
    thinking: string;
    message: string;
}

export function handleChatResponse(response: any, modelConfig: ModelConfig): ChatResponse {
    switch (modelConfig.model.type) {
        case 'speedv2': {
            try {
                const speedV2Response = response as DoubaoSpeedV2AIChatResponse;
                if (speedV2Response && 
                    speedV2Response.output && 
                    speedV2Response.output[0] && 
                    speedV2Response.output[0].content && 
                    speedV2Response.output[0].content[0] && 
                    speedV2Response.output[0].content[0].text) {
                    const message = speedV2Response.output[0].content[0].text;
                    return {
                        thinking: '',
                        message
                    };
                } else {
                    throw new Error('Invalid response format for speedv2 model');
                }
            } catch (error) {
                console.error('Error handling speedv2 response:', error);
                throw new Error('Failed to parse AI response');
            }
        }
        case 'ollama':
            try {
                if (response && response.message && response.message.content) {
                    return {
                        thinking: '',
                        message: response.message.content
                    };
                } else {
                    throw new Error('Invalid response format for ollama model');
                }
            } catch (error) {
                console.error('Error handling ollama response:', error);
                throw new Error('Failed to parse AI response');
            }
        default:
            throw new Error(`Unsupported model type: ${modelConfig.model.type}`);
    }
}