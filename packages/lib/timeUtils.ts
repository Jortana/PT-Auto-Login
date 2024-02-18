/**
 * 将毫秒转换为分秒的形式
 */
export function msFormat(time: number, fullFormat?: boolean) {
  const minute = Math.floor(time / 1000 / 60) % 60
  const second = Math.floor(time / 1000) % 60

  if (fullFormat) {
    return `${minute}m ${second}s`
  }

  const minuteStr = minute > 0 ? `${minute}m ` : ''
  const secondStr = second
  return `${minuteStr}${secondStr}s`
}

/**
 * 小于10数字前补0
 * @param num
 */
export function addZero(num: number) {
  return `${num < 10 ? '0' : ''}${num}`
}