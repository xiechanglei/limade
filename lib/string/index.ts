/**
 * 判读是否为空
 */
export function isEmpty(value: any): boolean {
    return value === null || value === undefined || value === '';
}

/**
 * 判读是否不为空
 */
export function isNotEmpty(value: any): boolean {
    return !isEmpty(value)
}

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
/**
 * 生成一个指定长度的随机字符串
 */
export function randomString(length: number): string {
    let result = '';
    for (let i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}