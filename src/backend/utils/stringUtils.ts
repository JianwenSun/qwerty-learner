/**
 * 校验字符串是否为空
 * @param str 要校验的字符串
 * @returns 校验结果，true 表示字符串不为空，false 表示字符串为空
 */
export function isNotEmpty(str: string): boolean {
  return str !== undefined && str !== null && str.trim() !== '';
}

/**
 * 校验字符串是否为空
 * @param str 要校验的字符串
 * @returns 校验结果，true 表示字符串为空，false 表示字符串不为空
 */
export function isEmpty(str: string): boolean {
  return !isNotEmpty(str);
}

/**
 * 去除字符串首尾空格
 * @param str 要处理的字符串
 * @returns 去除首尾空格后的字符串
 */
export function trim(str: string): string {
  return str ? str.trim() : '';
}
