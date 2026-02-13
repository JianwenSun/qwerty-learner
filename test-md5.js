/**
 * 测试脚本，验证纯 JavaScript MD5 实现与 Node.js crypto.createHash('md5') 的结果是否一致
 */

const crypto = require('crypto');

/**
 * 纯 JavaScript 实现的 MD5 算法
 * 参考：https://github.com/pvorb/node-md5/blob/master/md5.js
 */
function md5(string) {
    function rotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function addUnsigned(lX, lY) {
        const lX4 = (lX & 0x40000000);
        const lY4 = (lY & 0x40000000);
        const lX8 = (lX & 0x80000000);
        const lY8 = (lY & 0x80000000);
        const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);

        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function H(x, y, z) {
        return x ^ y ^ z;
    }

    function I(x, y, z) {
        return y ^ (x | (~z));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function GG(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function HH(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function II(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function convertToWordArray(string) {
        const lWordCount = ((string.length + 8) >>> 6) + 1;
        const lBitLength = string.length * 8;
        const lWordArray = new Array(lWordCount);

        for (let i = 0; i < lWordCount; i++) {
            lWordArray[i] = 0;
        }

        for (let i = 0; i < lBitLength; i += 8) {
            lWordArray[i >>> 5] |= (string.charCodeAt(i / 8) & 0xFF) << (i % 32);
        }

        lWordArray[lBitLength >>> 5] |= 0x80 << (lBitLength % 32);
        lWordArray[lWordCount - 1] = lBitLength;

        return lWordArray;
    }

    function wordToHex(lValue) {
        let WordToHexValue = "";
        let WordToHexValueTemp = "";

        for (let i = 0; i <= 3; i++) {
            WordToHexValueTemp = "0" + ((lValue >>> (i * 8)) & 0xFF).toString(16);
            WordToHexValue += WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
        }

        return WordToHexValue;
    }

    function utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";

        for (let n = 0; n < string.length; n++) {
            const c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }

        return utftext;
    }

    const x = convertToWordArray(utf8Encode(string));
    const a = 0x67452301;
    const b = 0xEFCDAB89;
    const c = 0x98BADCFE;
    const d = 0x10325476;

    const k = [
        0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
        0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
        0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
        0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
        0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
        0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
        0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
        0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
        0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
        0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
        0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
        0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
        0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
        0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
        0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
        0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
    ];

    const s = [
        7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
        5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
        4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
        6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
    ];

    let aa = a;
    let bb = b;
    let cc = c;
    let dd = d;

    for (let j = 0; j < x.length - 1; j += 16) {
        let a = aa;
        let b = bb;
        let c = cc;
        let d = dd;

        a = FF(a, b, c, d, x[j + 0], s[0], k[0]);
        d = FF(d, a, b, c, x[j + 1], s[1], k[1]);
        c = FF(c, d, a, b, x[j + 2], s[2], k[2]);
        b = FF(b, c, d, a, x[j + 3], s[3], k[3]);
        a = FF(a, b, c, d, x[j + 4], s[4], k[4]);
        d = FF(d, a, b, c, x[j + 5], s[5], k[5]);
        c = FF(c, d, a, b, x[j + 6], s[6], k[6]);
        b = FF(b, c, d, a, x[j + 7], s[7], k[7]);
        a = FF(a, b, c, d, x[j + 8], s[8], k[8]);
        d = FF(d, a, b, c, x[j + 9], s[9], k[9]);
        c = FF(c, d, a, b, x[j + 10], s[10], k[10]);
        b = FF(b, c, d, a, x[j + 11], s[11], k[11]);
        a = FF(a, b, c, d, x[j + 12], s[12], k[12]);
        d = FF(d, a, b, c, x[j + 13], s[13], k[13]);
        c = FF(c, d, a, b, x[j + 14], s[14], k[14]);
        b = FF(b, c, d, a, x[j + 15], s[15], k[15]);

        a = GG(a, b, c, d, x[j + 1], s[16], k[16]);
        d = GG(d, a, b, c, x[j + 6], s[17], k[17]);
        c = GG(c, d, a, b, x[j + 11], s[18], k[18]);
        b = GG(b, c, d, a, x[j + 0], s[19], k[19]);
        a = GG(a, b, c, d, x[j + 5], s[20], k[20]);
        d = GG(d, a, b, c, x[j + 10], s[21], k[21]);
        c = GG(c, d, a, b, x[j + 15], s[22], k[22]);
        b = GG(b, c, d, a, x[j + 4], s[23], k[23]);
        a = GG(a, b, c, d, x[j + 9], s[24], k[24]);
        d = GG(d, a, b, c, x[j + 14], s[25], k[25]);
        c = GG(c, d, a, b, x[j + 3], s[26], k[26]);
        b = GG(b, c, d, a, x[j + 8], s[27], k[27]);
        a = GG(a, b, c, d, x[j + 13], s[28], k[28]);
        d = GG(d, a, b, c, x[j + 2], s[29], k[29]);
        c = GG(c, d, a, b, x[j + 7], s[30], k[30]);
        b = GG(b, c, d, a, x[j + 12], s[31], k[31]);

        a = HH(a, b, c, d, x[j + 5], s[32], k[32]);
        d = HH(d, a, b, c, x[j + 8], s[33], k[33]);
        c = HH(c, d, a, b, x[j + 11], s[34], k[34]);
        b = HH(b, c, d, a, x[j + 14], s[35], k[35]);
        a = HH(a, b, c, d, x[j + 1], s[36], k[36]);
        d = HH(d, a, b, c, x[j + 4], s[37], k[37]);
        c = HH(c, d, a, b, x[j + 7], s[38], k[38]);
        b = HH(b, c, d, a, x[j + 10], s[39], k[39]);
        a = HH(a, b, c, d, x[j + 13], s[40], k[40]);
        d = HH(d, a, b, c, x[j + 0], s[41], k[41]);
        c = HH(c, d, a, b, x[j + 3], s[42], k[42]);
        b = HH(b, c, d, a, x[j + 6], s[43], k[43]);
        a = HH(a, b, c, d, x[j + 9], s[44], k[44]);
        d = HH(d, a, b, c, x[j + 12], s[45], k[45]);
        c = HH(c, d, a, b, x[j + 15], s[46], k[46]);
        b = HH(b, c, d, a, x[j + 2], s[47], k[47]);

        a = II(a, b, c, d, x[j + 0], s[48], k[48]);
        d = II(d, a, b, c, x[j + 7], s[49], k[49]);
        c = II(c, d, a, b, x[j + 14], s[50], k[50]);
        b = II(b, c, d, a, x[j + 5], s[51], k[51]);
        a = II(a, b, c, d, x[j + 12], s[52], k[52]);
        d = II(d, a, b, c, x[j + 3], s[53], k[53]);
        c = II(c, d, a, b, x[j + 10], s[54], k[54]);
        b = II(b, c, d, a, x[j + 1], s[55], k[55]);
        a = II(a, b, c, d, x[j + 8], s[56], k[56]);
        d = II(d, a, b, c, x[j + 15], s[57], k[57]);
        c = II(c, d, a, b, x[j + 6], s[58], k[58]);
        b = II(b, c, d, a, x[j + 13], s[59], k[59]);
        a = II(a, b, c, d, x[j + 4], s[60], k[60]);
        d = II(d, a, b, c, x[j + 11], s[61], k[61]);
        c = II(c, d, a, b, x[j + 2], s[62], k[62]);
        b = II(b, c, d, a, x[j + 9], s[63], k[63]);

        aa = addUnsigned(aa, a);
        bb = addUnsigned(bb, b);
        cc = addUnsigned(cc, c);
        dd = addUnsigned(dd, d);
    }

    return wordToHex(aa) + wordToHex(bb) + wordToHex(cc) + wordToHex(dd);
}

/**
 * 使用 Node.js crypto 模块生成 MD5 哈希
 */
function nodejsMD5(text) {
    const hash = crypto.createHash('md5');
    hash.update(text);
    return hash.digest('hex');
}

/**
 * 测试 MD5 实现
 */
function testMD5() {
    // 测试数据
    const testData = [
        'test-md5-key',
        'QFNoYU5CZUlACg==', // SecretKey
        '@ShaNBeI@', // 原始密钥
        'Hello, world!',
        ''
    ];

    console.log('=== MD5 实现测试 ===\n');

    for (const data of testData) {
        const jsMD5 = md5(data);
        const nodeMD5 = nodejsMD5(data);
        const match = jsMD5 === nodeMD5;

        console.log(`测试数据: "${data}"`);
        console.log(`纯 JavaScript MD5: ${jsMD5}`);
        console.log(`Node.js MD5:      ${nodeMD5}`);
        console.log(`结果匹配: ${match ? '✅' : '❌'}`);
        console.log('---');
    }
}

// 运行测试
testMD5();
