import { LogCommand, LogType } from '~/interface/logger'
import chalk from 'chalk'

/**
 * 统一日志输出
 * @param title 
 * @param message 
 */
export function log(title: string, message: string) {
  logByType(title, message, LogType.LOG)
}

/**
 * 统一日志成功输出 
 * @param title 
 * @param message 
 */
log.success = function (title: string, message: string) {
  logByType(title, message, LogType.SUCCESS)
}

/**
 * 统一日志警告输出
 * @param title 
 * @param message 
 */
log.warn = function (title: string, message: string) {
  logByType(title, message, LogType.WARN)
}

/**
 * 统一日志错误输出
 * @param title 
 * @param message 
 */
log.error = function (title: string, message: string) {
  logByType(title, message, LogType.ERROR)
}

function logByType(title: string, message: string, type: LogType) {
  const currentTime = new Date().toLocaleString('zh-CN')
  const timeString = chalk.dim(`[${currentTime}]`)
  const pidString = chalk.dim(`[PID: ${process.pid}]`)
  const tips: Record<LogType, string> = {
    [LogType.LOG]: buildColorfulBgStr('[INFO]', LogType.LOG),
    [LogType.SUCCESS]: buildColorfulBgStr('[SUCCESS]', LogType.SUCCESS),
    [LogType.WARN]: buildColorfulBgStr('[WARN]', LogType.WARN),
    [LogType.ERROR]: buildColorfulBgStr('[ERROR]', LogType.ERROR)
  }

  const command: Record<LogType, LogCommand> = {
    [LogType.LOG]: 'log',
    [LogType.SUCCESS]: 'log',
    [LogType.WARN]: 'warn',
    [LogType.ERROR]: 'error'
  }

  const colorfulTitle = buildColorfulStr(`[${title}]`, type)

  const str = `${tips[type]} ${timeString} ${pidString} ${colorfulTitle} ${message}`
  console[command[type]](str)
}

export function buildColorfulStr(content: string, type: LogType) {
  const typeMap: Record<LogType, string> = {
    [LogType.LOG]: chalk.cyan(content),
    [LogType.SUCCESS]: chalk.green(content),
    [LogType.WARN]: chalk.yellow(content),
    [LogType.ERROR]: chalk.red(content)
  }

  return typeMap[type]
}

export function buildColorfulBgStr(content: string, type: LogType) {
  const typeMap: Record<LogType, string> = {
    [LogType.LOG]: chalk.bgCyan(content),
    [LogType.SUCCESS]: chalk.bgGreen(content),
    [LogType.WARN]: chalk.bgYellow(content),
    [LogType.ERROR]: chalk.bgRed(content)
  }

  return typeMap[type]
}
