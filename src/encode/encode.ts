/**
 * 使用 MD5 密钥加密文本
 * @param key MD5 密钥
 * @param text 待加密的文本
 * @returns 加密后的内容
 */
export async function encode(key: string, text: string): Promise<string> {
  try {
    // 检查浏览器是否支持 Web Crypto API
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error('Web Crypto API is not supported in this environment');
    }

    // 使用 MD5 生成 16 字节的密钥
    const md5Key = (await generateMD5(key)).substring(0, 16);

    // 生成 16 字节的初始化向量
    const iv = window.crypto.getRandomValues(new Uint8Array(16));

    // 将文本转换为 Uint8Array
    const textEncoder = new TextEncoder();
    const textData = textEncoder.encode(text);

    // 使用 AES-128-CBC 加密
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      textEncoder.encode(md5Key),
      { name: 'AES-CBC' },
      false,
      ['encrypt']
    );

    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-CBC', iv },
      cryptoKey,
      textData
    );

    // 将加密结果转换为 base64
    const encryptedArray = new Uint8Array(encrypted);
    let binary = '';
    for (let i = 0; i < encryptedArray.length; i++) {
      binary += String.fromCharCode(encryptedArray[i]);
    }
    const encryptedBase64 = btoa(binary);
    const ivBase64 = btoa(Array.from(iv, byte => String.fromCharCode(byte)).join(''));

    // 将初始化向量和加密结果组合返回
    return `${ivBase64}:${encryptedBase64}`;
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
    // 检查浏览器是否支持 Web Crypto API
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error('Web Crypto API is not supported in this environment');
    }

    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('MD5', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (error) {
    console.error('MD5 generation error:', error);
    throw new Error('Failed to generate MD5 hash');
  }
}
