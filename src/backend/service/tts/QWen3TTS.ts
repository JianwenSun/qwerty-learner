import axios from 'axios';

import { VoiceType } from '../../types/VoiceType';
import config from '../../config/config';

// 调用流式 TTS 接口并返回 MP3 数据
export async function streamQwen3TTS(text: string, voiceType: VoiceType): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        try {
            console.log(`开始流式 TTS 生成，文本：${text}，声音类型：${voiceType}`);

            // 根据 VoiceType 适配服务端参数
            let voiceParam: string;
            switch (voiceType) {
                case VoiceType.Female:
                    voiceParam = 'A clear, calm, and natural adult female voice with no background noise.';
                    break;
                case VoiceType.Male:
                    voiceParam = 'A clear, calm, and natural adult male voice with no background noise.'; // 假设服务端支持男性声音
                    break;
                default:
                    voiceParam = 'A clear, calm, and natural adult female voice with no background noise.'; // 默认使用女性声音
            }

            axios.post(
                config.tts.qwen3.serviceUrl,
                {
                    text: text,
                    voice: voiceParam,
                    speed: 1.0
                },
                {
                    responseType: 'arraybuffer', // 关键：指定响应为 ArrayBuffer
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then(response => {
                console.log('成功连接到 TTS 服务，开始接收音频流');

                // 将 ArrayBuffer 转换为 Buffer
                const buffer = Buffer.from(response.data);
                console.log(`成功接收音频数据，大小：${buffer.length} 字节`);
                resolve(buffer);

            }).catch(error => {
                console.error('流式调用失败:', error instanceof Error ? error.message : String(error));
                if (error instanceof Error) {
                    console.error('错误详情:', error.stack);
                }
                reject(error);
            });

        } catch (error) {
            console.error('流式调用失败:', error instanceof Error ? error.message : String(error));
            if (error instanceof Error) {
                console.error('错误详情:', error.stack);
            }
            reject(error);
        }
    });
}