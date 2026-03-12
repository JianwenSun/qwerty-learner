import zlib from 'zlib';

/**
 * 压缩工具类
 * 用于处理数据的压缩和解压缩
 */
export class CompressionUtil {
  /**
   * 压缩数据
   * @param data 要压缩的数据
   * @returns 压缩后的数据
   */
  static compress(data: Buffer | Uint8Array): Buffer {
    return zlib.gzipSync(data as any);
  }

  /**
   * 解压数据
   * @param compressedData 压缩的数据
   * @returns 解压后的数据
   */
  static decompress(compressedData: Buffer | Uint8Array): Buffer {
    return zlib.gunzipSync(compressedData as any);
  }

  /**
   * 检查数据是否是gzip压缩的
   * @param data 要检查的数据
   * @returns 是否是gzip压缩的
   */
  static isGzipped(data: Buffer | Uint8Array): boolean {
    // gzip文件的魔数是 0x1f8b
    return data.length >= 2 && data[0] === 0x1f && data[1] === 0x8b;
  }
}