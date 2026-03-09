import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 系统配置
export interface SystemConfig {
  // TTS 配置
  tts: {
    // TTS 引擎类型: 'qwen3' | 'gtts'
    engine: 'qwen3' | 'gtts';
    // Qwen3 TTS 配置
    qwen3: {
      // Qwen3 TTS 服务地址
      serviceUrl: string;
    };
    // GTTS 配置
    gtts: {
      languageCode: string;
    };
  };
}

// 默认配置
const defaultConfig: SystemConfig = {
  tts: {
    engine: 'gtts',
    qwen3: {
      serviceUrl: 'http://localhost:8000/tts/stream'
    },
    gtts: {
      languageCode: 'en-US'
    }
  }
};

// 合并环境变量配置
const config: SystemConfig = {
  tts: {
    engine: process.env.TTS_ENGINE as 'qwen3' | 'gtts' || defaultConfig.tts.engine,
    qwen3: {
      serviceUrl: process.env.TTS_QWEN3_URL || defaultConfig.tts.qwen3.serviceUrl
    },
    gtts: {
      languageCode: process.env.TTS_GTTs_LANGUAGE_CODE || defaultConfig.tts.gtts.languageCode
    }
  }
};

export default config;