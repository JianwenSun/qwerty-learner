import { Router, Request, Response } from 'express';
import { TTSService } from '../service/tts/TTSService';
import { VoiceType } from '../types/VoiceType';
import { SentenceStatus } from '../storage/dao/SentenceSoundDAO';
import zlib from 'zlib';

const router = Router();
const ttsService = new TTSService();

// 获取所有句子的TTS生成状态
router.get('/status', async (req: Request, res: Response) => {
  try {
    // 查找所有未删除的句子及其音频状态
    const statusData: SentenceStatus[] = await ttsService.getTTSStatus();

    res.json({
      success: true,
      data: statusData
    });
  } catch (error) {
    console.error('Error getting TTS status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get TTS status'
    });
  }
});

// 手动触发句子的TTS生成
router.post('/generate/:sentenceId', async (req: Request, res: Response) => {
  try {
    const sentenceId = req.params.sentenceId as string;
    const voiceType = req.body.voiceType as VoiceType;

    // 验证参数
    if (!sentenceId || !voiceType) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters'
      });
    }

    // 生成并保存TTS
    await ttsService.generateAndSaveTTS(parseInt(sentenceId), voiceType);

    res.json({
      success: true,
      message: 'TTS generated successfully'
    });
  } catch (error) {
    console.error('Error generating TTS:', error);
    if (error instanceof Error && error.message === 'Sentence not found') {
      res.status(404).json({
        success: false,
        error: 'Sentence not found'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to generate TTS'
      });
    }
  }
});

// 删除句子的音频文件
console.log('Registering delete endpoint');
router.delete('/sound/:sentenceId/:voiceType', async (req: Request, res: Response) => {
  try {
    const sentenceId = req.params.sentenceId as string;
    const voiceType = req.params.voiceType as VoiceType;

    // 删除音频
    await ttsService.deleteTTS(parseInt(sentenceId), voiceType);

    res.json({
      success: true,
      message: 'Audio deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting audio:', error);
    if (error instanceof Error && error.message === 'Audio not found') {
      res.status(404).json({
        success: false,
        error: 'Audio not found'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to delete audio'
      });
    }
  }
});

// 获取句子的音频文件
router.get('/sound/:sentenceId/:voiceType', async (req: Request, res: Response) => {
  try {
    const sentenceId = req.params.sentenceId as string;
    const voiceType = req.params.voiceType as VoiceType;

    // 查找音频记录
    const sentenceSound = await ttsService.getTTS(parseInt(sentenceId), voiceType);

    if (!sentenceSound) {
      return res.status(404).json({
        success: false,
        error: 'Audio not found'
      });
    }

    // 设置响应头
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `inline; filename="sentence-${sentenceId}-${voiceType}.mp3"`);

    // 解压音频数据
    try {
      const decompressedBuffer = zlib.gunzipSync(sentenceSound.mp3Data);
      // 发送解压后的音频数据
      res.send(decompressedBuffer);
    } catch (error) {
      console.error('Error decompressing audio:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error getting audio:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get audio'
    });
  }
});

export default router;