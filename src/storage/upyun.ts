// upyun.ts - 又拍云API封装

import { globalUpyunConfig } from "@/config/settings";
import { UpyunConfig } from "@/config/upyun";

interface Response {
  success: boolean;
  message: string;
  [key: string]: any;
}

interface FileList extends Response {
  files?: Array<{
    name: string;
    type: string;
    size: number;
    time: number;
  }>;
  result?: any;
  status?: number;
  error?: any;
}

export class Upyun {
  private service: string;
  private operator: string;
  private operatorPassword: string;
  private endpoint: string;
  private signature: string;

  constructor(config: UpyunConfig) {
    this.service = config.service;
    this.operator = config.operator;
    this.operatorPassword = config.operatorPassword;
    // 确保endpoint包含完整的协议和域名
    let endpoint = config.endpoint || 'v0.api.upyun.com';
    if (!endpoint.startsWith('http://') && !endpoint.startsWith('https://')) {
      // 检查是否是相对路径（以/开头）
      if (endpoint.startsWith('/')) {
        // 在浏览器环境中，使用当前页面的origin作为基础URL
        if (typeof window !== 'undefined') {
          endpoint = window.location.origin + endpoint;
        } else {
          // 在非浏览器环境中，使用默认的v0.api.upyun.com
          endpoint = 'https://v0.api.upyun.com';
        }
      } else {
        // 对于非相对路径，添加https://前缀
        endpoint = 'https://' + endpoint;
      }
    }
    this.endpoint = endpoint;
    this.signature = this.getSignature();
  }

  private getSignature(): string {
    const up = `${this.operator}:${this.operatorPassword}`;
    const signature = Base64.encode(up);
    return `Basic ${signature}`;
  }

  /**
   * 获取服务名称
   */
  public getServiceName(): string {
    return 'UpyunService';
  }

  /**
   * 上传文件
   * @param {string} remotePath - 远程文件路径，如'/test.txt'
   * @param {string} fileContent - 文件内容，字符串形式
   * @returns {Promise<Object>} 上传结果
   */
  uploadFile(remotePath: string, fileContent: string | ArrayBuffer): Promise<Response> {
    return new Promise(async (resolve) => {
      try {
        // 确保路径以/开头
        if (!remotePath.startsWith('/')) {
          remotePath = '/' + remotePath;
        }

        const uri = `/${this.service}${remotePath}`;

        const response = await fetch(`${this.endpoint}${uri}`, {
          method: 'PUT',
          headers: {
            'Authorization': this.signature,
          },
          body: fileContent,
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          resolve({
            success: true,
            message: '文件上传成功',
            result: data
          });
        } else {
          resolve({
            success: false,
            message: '文件上传失败',
            status: response.status,
            error: data
          });
        }
      } catch (error: any) {
        console.error('文件上传发生错误', { remotePath, error: error.message });
        resolve({
          success: false,
          message: '文件上传发生错误',
          error: error.message
        });
      }
    });
  }

  /**
   * 下载文件
   * @param {string} remotePath - 远程文件路径，如'/test.txt'
   * @returns {Promise<Object>} 下载结果
   */
  downloadFile(remotePath: string): Promise<Response> {
    return new Promise(async (resolve) => {
      try {
        // 确保路径以/开头
        if (!remotePath.startsWith('/')) {
          remotePath = '/' + remotePath;
        }

        const uri = `/${this.service}${remotePath}`;
        console.debug('下载文件', { remotePath });

        const response = await fetch(`${this.endpoint}${uri}`, {
          method: 'GET',
          headers: {
            'Authorization': this.signature
          },
        });

        const data = await response.json().catch(() => ({}));
        const contentType = response.headers.get('content-type');

        if (response.ok) {
          resolve({
            success: true,
            message: '文件下载成功',
            data: data,
            contentType: contentType
          });
        } else {
          resolve({
            success: false,
            message: '文件下载失败',
            status: response.status,
            error: data
          });
        }
      } catch (error: any) {
        console.error('文件下载发生错误', { remotePath, error: error.message });
        resolve({
          success: false,
          message: '文件下载发生错误',
          error: error.message
        });
      }
    });
  }

  /**
   * 获取文件信息
   * @param {string} remotePath - 远程文件路径
   * @returns {Promise<Object>} 文件信息
   */
  getFileInfo(remotePath: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        // 确保路径以/开头
        if (!remotePath.startsWith('/')) {
          remotePath = '/' + remotePath;
        }

        const uri = `/${this.service}${remotePath}`;
        const date = new Date().toUTCString();

        const response = await fetch(`${this.endpoint}${uri}`, {
          method: 'GET',
          headers: {
            'Authorization': this.signature,
            'Date': date
          },
        });

        if (response.ok && response.body) {
          try {
            const bodyText = await response.clone().text();
            resolve(bodyText);
          } catch (error) {
            console.error('Error reading response body:', error);
            reject('Error reading response body');
          }
        } else {
          const errorMessage = `Failed to get file info: ${response.status} ${response.statusText}`;
          console.error(errorMessage);
          reject(errorMessage);
        }
      } catch (error: any) {
        console.error('获取文件信息发生错误', { remotePath, error: error.message });
        reject(error.message);
      }
    });
  }

  /**
   * 删除文件
   * @param {string} remotePath - 远程文件路径
   * @returns {Promise<Object>} 删除结果
   */
  deleteFile(remotePath: string): Promise<Response> {
    return new Promise(async (resolve) => {
      try {
        // 确保路径以/开头
        if (!remotePath.startsWith('/')) {
          remotePath = '/' + remotePath;
        }

        const uri = `/${this.service}${remotePath}`;
        const date = new Date().toUTCString();
        console.debug('删除文件', { remotePath });

        const response = await fetch(`${this.endpoint}${uri}`, {
          method: 'DELETE',
          headers: {
            'Authorization': this.signature,
            'Date': date
          },
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          resolve({
            success: true,
            message: '文件删除成功'
          });
        } else {
          resolve({
            success: false,
            message: '文件删除失败',
            status: response.status,
            error: data
          });
        }
      } catch (error: any) {
        console.error('文件删除发生错误', { remotePath, error: error.message });
        resolve({
          success: false,
          message: '文件删除发生错误',
          error: error.message
        });
      }
    });
  }

  /**
   * 列出目录下的文件
   * @param {string} remotePath - 远程目录路径，如'/'
   * @param {number} limit - 每页返回的文件数量，默认100
   * @param {string} order - 排序方式，默认asc
   * @returns {Promise<Object>} 文件列表结果
   */
  listFiles(remotePath: string = '/', limit: number = 100, order: 'asc' | 'desc' = 'asc'): Promise<FileList> {
    return new Promise(async (resolve) => {
      try {
        // 确保路径以/开头
        if (!remotePath.startsWith('/')) {
          remotePath = '/' + remotePath;
        }

        const uri = `/${this.service}${remotePath}?limit=${limit}&order=${order}`;
        const date = new Date().toUTCString();
        console.debug('获取文件列表', { remotePath, limit, order });

        const response = await fetch(`${this.endpoint}${uri}`, {
          method: 'GET',
          headers: {
            'Authorization': this.signature,
            'Date': date
          },
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          resolve({
            success: true,
            message: '获取文件列表成功',
            files: (data as any).files || [],
            result: data
          });
        } else {
          resolve({
            success: false,
            message: '获取文件列表失败',
            status: response.status,
            error: data
          });
        }
      } catch (error: any) {
        console.error('获取文件列表发生错误', { remotePath, limit, order, error: error.message });
        resolve({
          success: false,
          message: '获取文件列表发生错误',
          error: error.message
        });
      }
    });
  }
}

/* eslint-disable */
class Base64 {
  // private static property declaration
  private static _keyStr: string;

  // public method for encoding
  public static encode(input: string): string {
    let output = '';
    let chr1: number, chr2: number, chr3: number, enc1: number, enc2: number, enc3: number, enc4: number;
    let i = 0;
    input = Base64._utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
        Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
    }
    return output;
  }
  // public method for decoding
  public static decode(input: string): string {
    let output = '';
    let chr1: number, chr2: number, chr3: number;
    let enc1: number, enc2: number, enc3: number, enc4: number;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (i < input.length) {
      enc1 = Base64._keyStr.indexOf(input.charAt(i++));
      enc2 = Base64._keyStr.indexOf(input.charAt(i++));
      enc3 = Base64._keyStr.indexOf(input.charAt(i++));
      enc4 = Base64._keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = Base64._utf8_decode(output);
    return output;
  }
  // private method for UTF-8 encoding
  private static _utf8_encode(string: string): string {
    string = string.replace(/\r\n/g, '\n');
    let utftext = '';
    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n);
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
  // private method for UTF-8 decoding
  private static _utf8_decode(utftext: string): string {
    let string = '';
    let i = 0;
    let c: number, c2: number, c3: number;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}

// 添加静态属性（微信小程序不支持类内静态属性定义）
// @ts-ignore
Base64._keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

// 导出Upyun类
export const UpyunClient = new Upyun(globalUpyunConfig)