/**
 * Node.js 测试脚本，直接使用 Node.js crypto 模块实现加密解密
 */

const crypto = require('crypto');

/**
 * 生成 MD5 哈希
 * @param text 待哈希的文本
 * @returns MD5 哈希值
 */
function generateMD5(text) {
    const hash = crypto.createHash('md5');
    hash.update(text);
    return hash.digest('hex');
}

/**
 * 使用 MD5 密钥加密文本
 * @param key MD5 密钥
 * @param text 待加密的文本
 * @returns 加密后的内容
 */
function encode(key, text) {
    // 使用 MD5 生成 16 字节的密钥
    const md5Key = generateMD5(key).substring(0, 16);

    // 生成 16 字节的初始化向量
    const iv = crypto.randomBytes(16);

    // 使用 AES-128-CBC 加密
    const cipher = crypto.createCipheriv('aes-128-cbc', md5Key, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    // 将初始化向量转换为 base64
    const ivBase64 = iv.toString('base64');

    // 将初始化向量和加密结果组合返回
    return `${ivBase64}:${encrypted}`;
}

/**
 * 使用 MD5 密钥解密文本
 * @param key MD5 密钥
 * @param encryptedText 加密后的文本
 * @returns 解密后的内容
 */
function decode(key, encryptedText) {
    // 从加密文本中提取初始化向量和加密数据
    const [ivBase64, encryptedBase64] = encryptedText.split(':');
    if (!ivBase64 || !encryptedBase64) {
        throw new Error('Invalid encrypted text format');
    }

    // 解码 base64 数据
    const iv = Buffer.from(ivBase64, 'base64');

    // 使用 MD5 生成 16 字节的密钥
    const md5Key = generateMD5(key).substring(0, 16);

    // 使用 AES-128-CBC 解密
    const decipher = crypto.createDecipheriv('aes-128-cbc', md5Key, iv);
    let decrypted = decipher.update(encryptedBase64, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

function testEncodeDecode() {
    try {
        // 测试数据
        const testKey = 'test-md5-key';
        const testText = 'Hello, this is a test message for encryption and decryption!';

        console.log('=== 测试开始 ===');
        console.log('原始文本:', testText);
        console.log('使用的密钥:', testKey);

        // 加密文本
        const encryptedText = encode(testKey, testText);
        console.log('加密后结果:', encryptedText);

        // 解密文本
        const decryptedText = decode(testKey, encryptedText);
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
        console.error('错误堆栈:', error.stack);
    }
}

// 运行测试
testEncodeDecode();
