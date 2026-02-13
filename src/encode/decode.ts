import CryptoJS from 'crypto-js';

/**
 * 使用 MD5 密钥解密文本
 * @param key MD5 密钥
 * @param encryptedText 加密后的文本
 * @returns 解密后的内容
 */
export async function decode(key: string, encryptedText: string): Promise<string> {
    try {
        // 从加密文本中提取初始化向量和加密数据
        const [ivBase64, encryptedBase64] = encryptedText.split(':');
        if (!ivBase64 || !encryptedBase64) {
            throw new Error('Invalid encrypted text format');
        }

        // 使用 MD5 生成 16 字节的密钥（与加密时相同）
        const md5Key = CryptoJS.MD5(key).toString().substring(0, 16);

        // 解码初始化向量和加密数据
        const iv = CryptoJS.enc.Base64.parse(ivBase64);
        const encryptedData = CryptoJS.enc.Base64.parse(encryptedBase64);

        // 使用 AES-CBC 解密
        const decrypted = CryptoJS.AES.decrypt(
            { ciphertext: encryptedData } as CryptoJS.lib.CipherParams,
            CryptoJS.enc.Utf8.parse(md5Key),
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );

        // 将解密后的内容转换为字符串
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

        if (!decryptedText) {
            throw new Error('Failed to decrypt text: Empty result');
        }

        return decryptedText;
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt text');
    }
}
