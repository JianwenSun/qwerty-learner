"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextModel = getNextModel;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// 读取 AI 配置文件
let aiConfig;
let currentModelIndex = 0;
try {
    const configPath = path.join(__dirname, 'ai.config.json');
    const configContent = fs.readFileSync(configPath, 'utf8');
    aiConfig = JSON.parse(configContent);
    console.log('AI config loaded successfully:', aiConfig);
}
catch (error) {
    console.error('Error loading AI config:', error);
    throw new Error('Failed to load AI config');
}
// 获取当前模型组的模型列表
function getCurrentModelList() {
    const modelGroup = aiConfig.modelGroup;
    if (modelGroup === 'local' && aiConfig.modelGroups.local) {
        return aiConfig.modelGroups.local;
    }
    else if (modelGroup === 'remote' && aiConfig.modelGroups.remote) {
        return aiConfig.modelGroups.remote;
    }
    // 默认返回本地模型
    return aiConfig.modelGroups.local || [];
}
// 获取下一个模型配置
function getNextModel() {
    const modelList = getCurrentModelList();
    if (modelList.length === 0) {
        throw new Error('No models available in the current model group');
    }
    const model = modelList[currentModelIndex];
    // 轮询到下一个模型
    currentModelIndex = (currentModelIndex + 1) % modelList.length;
    return model;
}
