"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRequest = buildRequest;
const ollama_1 = require("./ollama");
const speedv2_1 = require("./speedv2");
function buildRequest(systemInput, userInput, modelConfig) {
    switch (modelConfig.model.type) {
        case 'speedv2':
            return (0, speedv2_1.buildSpeedV2Request)(systemInput, userInput, modelConfig);
        case 'ollama':
            return (0, ollama_1.buildOllamaRequest)(systemInput, userInput, modelConfig);
        default:
            throw new Error(`Unsupported model type: ${modelConfig.model.type}`);
    }
}
