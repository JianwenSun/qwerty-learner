

import * as fs from 'fs';
import * as path from 'path';

type ProviderType = 'ollama' | 'openapi';
type ModelType = 'speedv2' | 'ollama';

export interface Model {
    type: ModelType;
    name: string;
}

export interface ModelConfig {
    name: string;
    url: string;
    apiKey: string;
    model: Model;
    provider: ProviderType;
}

interface AIConfig {
    modelGroup: string;
    modelGroups: {
        local: ModelConfig[];
        remote: ModelConfig[];
    };
}

// 读取 AI 配置文件
let aiConfig: AIConfig;
let currentModelIndex = 0;

try {
    const configPath = path.join(__dirname, 'ai.config.json');
    const configContent = fs.readFileSync(configPath, 'utf8');
    aiConfig = JSON.parse(configContent);
    console.log('AI config loaded successfully:', aiConfig);
} catch (error) {
    console.error('Error loading AI config:', error);
    throw new Error('Failed to load AI config');
}

// 获取当前模型组的模型列表
function getCurrentModelList(): ModelConfig[] {
    const modelGroup = aiConfig.modelGroup;
    if (modelGroup === 'local' && aiConfig.modelGroups.local) {
        return aiConfig.modelGroups.local;
    } else if (modelGroup === 'remote' && aiConfig.modelGroups.remote) {
        return aiConfig.modelGroups.remote;
    }
    // 默认返回本地模型
    return aiConfig.modelGroups.local || [];
}

// 获取下一个模型配置
export function getNextModel(): ModelConfig {
    const modelList = getCurrentModelList();
    if (modelList.length === 0) {
        throw new Error('No models available in the current model group');
    }
    const model = modelList[currentModelIndex];
    // 轮询到下一个模型
    currentModelIndex = (currentModelIndex + 1) % modelList.length;
    return model;
}