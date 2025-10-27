export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
}

class Logger {
  private logs: LogEntry[] = []
  private maxLogs = 1000

  log(level: LogLevel, message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    }

    this.logs.push(entry)

    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }

    if (typeof console !== "undefined") {
      const logFn = level === LogLevel.ERROR ? console.error : level === LogLevel.WARN ? console.warn : console.log
      logFn(`[${level}] ${message}`, context)
    }
  }

  debug(message: string, context?: Record<string, any>) {
    this.log(LogLevel.DEBUG, message, context)
  }

  info(message: string, context?: Record<string, any>) {
    this.log(LogLevel.INFO, message, context)
  }

  warn(message: string, context?: Record<string, any>) {
    this.log(LogLevel.WARN, message, context)
  }

  error(message: string, context?: Record<string, any>) {
    this.log(LogLevel.ERROR, message, context)
  }

  getLogs() {
    return this.logs
  }

  clear() {
    this.logs = []
  }
}

export const logger = new Logger()
