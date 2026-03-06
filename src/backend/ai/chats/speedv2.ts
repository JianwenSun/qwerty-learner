import { OpenApiChat } from "./openapi";
import { ModelConfig } from "../config";

export interface DoubaoSpeedV2ContentItem {
    type: 'input_image' | 'input_text';
    image_url?: string | undefined;
    text?: string;
}

export interface Thinking {
    type: 'disabled';
}

export interface DoubaoSpeedV2InputItem {
    role: string;
    content: DoubaoSpeedV2ContentItem[];
}

export interface DoubaoSpeedV2AIChatRequest {
    model: string;
    input: DoubaoSpeedV2InputItem[];
    thinking: Thinking;
}

export interface OutputContentItem {
    type: string;
    text: string;
}

export interface OutputItem {
    type: string;
    role: string;
    content: OutputContentItem[];
    status: string;
    id: string;
}

export interface UsageDetails {
    cached_tokens?: number;
    reasoning_tokens?: number;
}

export interface Usage {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    input_tokens_details: UsageDetails;
    output_tokens_details: UsageDetails;
}

export interface Caching {
    type: 'disabled';
}

export interface DoubaoSpeedV2AIChatResponse {
    created_at: number;
    id: string;
    max_output_tokens: number;
    model: string;
    object: 'response';
    output: OutputItem[];
    thinking: Thinking;
    service_tier: 'default';
    status: 'completed';
    usage: Usage;
    caching: Caching;
    store: boolean;
    expire_at: number;
}

export class DoubaoSpeedV2Chat extends OpenApiChat<DoubaoSpeedV2AIChatRequest, DoubaoSpeedV2AIChatResponse> {
    constructor(modelConfig: ModelConfig) {
        super(modelConfig);
    }
}