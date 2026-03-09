"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSpeedV2Request = buildSpeedV2Request;
function buildSpeedV2Request(systemInput, userInput, modelConfig) {
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
