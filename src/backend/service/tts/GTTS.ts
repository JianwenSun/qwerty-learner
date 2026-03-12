import { VoiceType } from '../../types/VoiceType';
import config from '../../config/config';
import { spawnSync } from 'child_process';
import * as path from 'path';

// 调用 gTTS 脚本并返回 MP3 数据
export async function streamGTTS(text: string, voiceType: VoiceType): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    try {
      console.log(`开始 gTTS 生成，文本：${text}，声音类型：${voiceType}`);

      // 获取 gtts_service.py 脚本路径
      const gttsScriptPath = path.join(process.cwd(), 'tts', 'gtts_service.py');
      console.log(`gTTS 脚本路径: ${gttsScriptPath}`);

      const lang = config.tts.gtts.languageCode;

      // 执行 gtts_service.py 脚本
      const result = spawnSync('python3', [gttsScriptPath, text, lang, voiceType], {
        encoding: 'buffer',
        stdio: ['pipe', 'pipe', 'pipe']
      });

      // 检查是否有错误
      if (result.stderr && result.stderr.length > 0) {
        const errorMessage = result.stderr.toString('utf8');
        // 检查是否是真正的错误
        if (errorMessage.includes('Error generating TTS:')) {
          console.error('gTTS 执行错误:', errorMessage);
          reject(new Error(`gTTS 执行失败: ${errorMessage}`));
          return;
        } else {
          // 这是正常的日志输出，不是错误
          console.log('gTTS 执行日志:', errorMessage);
        }
      }

      // 检查是否有输出数据
      if (!result.stdout || result.stdout.length === 0) {
        console.error('gTTS 没有返回音频数据');
        reject(new Error('gTTS 没有返回音频数据'));
        return;
      }

      // 直接使用 stdout 作为 Buffer
      const buffer = result.stdout;
      console.log(`成功接收音频数据，大小：${buffer.length} 字节`);

      resolve(buffer);
    } catch (error) {
      console.error('gTTS 调用失败:', error instanceof Error ? error.message : String(error));
      if (error instanceof Error) {
        console.error('错误详情:', error.stack);
      }
      reject(error);
    }
  });
}