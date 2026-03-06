import { ModelConfig } from "../../config";
import { DoubaoSpeedV2AIChatRequest } from "../speedv2";

export function buildSpeedV2Request(systemInput: string, userInput: string, modelConfig: ModelConfig): DoubaoSpeedV2AIChatRequest {
    return {
        model: modelConfig.model.name,
        input: [
            {
                role: 'user',
                content: [
                    {
                        type: 'input_text',
                        text: systemInput
                    },
                    {
                        type: 'input_text',
                        text: userInput
                    }
                ]
            }
        ],
        thinking: {
            type: 'disabled'
        }
    };
}