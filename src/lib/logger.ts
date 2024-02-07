import { LogType } from '~/interface/logger'

/**
 * 统一日志输出
 * @param title 
 * @param message 
 * @param type 
 */
export function log(title: string, message: string) {
  logByType(title, message, 'log')
}

/**
 * 统一日志警告输出
 * @param title 
 * @param message 
 * @param type 
 */
log.warn = function (title: string, message: string) {
  logByType(title, message, 'warn')
}

/**
 * 统一日志错误输出
 * @param title 
 * @param message 
 * @param type 
 */
log.error = function (title: string, message: string) {
  logByType(title, message, 'error')
}

function logByType(title: string, message: string, type: LogType) {
  const currentTime = new Date().toLocaleString()
  const tips: Record<LogType, string> = {
    log: 'LOG',
    warn: 'WARN',
    error: 'ERROR'
  }
  const str = `[${currentTime}] [PID: ${process.pid}] [${tips[type]}] [${title}] ${message}`
  console[type](str)
}