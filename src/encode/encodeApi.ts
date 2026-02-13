import crypto from 'crypto';

/**
 * 使用 MD5 密钥加密文本
 * @param key MD5 密钥
 * @param text 待加密的文本
 * @returns 加密后的内容
 */
export async function encodeStr(key: string, text: string): Promise<string> {
  try {
    // 使用 MD5 生成 16 字节的密钥
    const md5Key = (await generateMD5(key)).substring(0, 16);

    // 生成 16 字节的初始化向量
    const iv = crypto.randomBytes(16);

    // 创建 AES-CBC 加密器
    const cipher = crypto.createCipheriv('aes-128-cbc', md5Key, iv);

    // 加密文本
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    // 将初始化向量转换为 base64
    const ivBase64 = iv.toString('base64');

    // 将初始化向量和加密结果组合返回
    return `${ivBase64}:${encrypted}`;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt text');
  }
}

/**
 * 生成 MD5 哈希
 * @param text 待哈希的文本
 * @returns MD5 哈希值
 */
async function generateMD5(text: string): Promise<string> {
  try {
    // 使用 Node.js crypto 模块生成 MD5 哈希
    const md5 = crypto.createHash('md5');
    md5.update(text);
    return md5.digest('hex');
  } catch (error) {
    console.error('MD5 generation error:', error);
    throw new Error('Failed to generate MD5 hash');
  }
}
