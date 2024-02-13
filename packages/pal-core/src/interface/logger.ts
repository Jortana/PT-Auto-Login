export enum LogType {
  LOG,
  SUCCESS,
  WARN,
  ERROR
}

export type LogCommand = 'log' | 'warn' | 'error' 