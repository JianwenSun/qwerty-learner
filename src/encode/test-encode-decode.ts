/**
 * 测试 encode 和 decode 函数
 */
import { encode } from './encode';
import { decode } from './decode';

async function testEncodeDecode() {
  try {
    // 测试数据
    const testKey = 'test-md5-key';
    const testText = 'Hello, this is a test message for encryption and decryption!';
    
    console.log('=== 测试开始 ===');
    console.log('原始文本:', testText);
    console.log('使用的密钥:', testKey);
    
    // 加密文本
    const encryptedText = await encode(testKey, testText);
    console.log('加密后结果:', encryptedText);
    
    // 解密文本
    const decryptedText = await decode(testKey, encryptedText);
    console.log('解密后结果:', decryptedText);
    
    // 验证解密结果是否与原始文本一致
    if (decryptedText === testText) {
      console.log('✅ 测试成功: 解密结果与原始文本一致');
    } else {
      console.log('❌ 测试失败: 解密结果与原始文本不一致');
      console.log('原始文本长度:', testText.length);
      console.log('解密文本长度:', decryptedText.length);
    }
    
    console.log('=== 测试结束 ===');
  } catch (error) {
    console.error('测试过程中出现错误:', error);
  }
}

// 运行测试
testEncodeDecode();
