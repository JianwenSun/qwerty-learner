import { ModelConfig } from "../../config";
import { buildOllamaRequest } from "./ollama";
import { buildSpeedV2Request } from "./speedv2";


export function buildRequest(systemInput: string, userInput: string, modelConfig: ModelConfig) {
    switch (modelConfig.model.type) {
        case 'speedv2':
            return buildSpeedV2Request(systemInput, userInput, modelConfig);
        case 'ollama':
            return buildOllamaRequest(systemInput, userInput, modelConfig);
        default:
            throw new Error(`Unsupported model type: ${modelConfig.model.type}`);
    }
}