const isDev = process.env.EXTENSION_PUBLIC_MODE === 'development';

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
) => {
  logger.debug('debouncing function');
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const logger: Pick<
  Console,
  'log' | 'error' | 'warn' | 'info' | 'debug'
> = {
  log: (message: string, ...optionalParams: any[]) =>
    console.log(`[LinkedZen] ${message}`, ...optionalParams),
  error: (message: string, ...optionalParams: any[]) =>
    console.error(`[LinkedZen] ${message}`, ...optionalParams),
  warn: (message: string, ...optionalParams: any[]) =>
    console.warn(`[LinkedZen] ${message}`, ...optionalParams),
  info: (message: string, ...optionalParams: any[]) =>
    console.info(`[LinkedZen] ${message}`, ...optionalParams),
  debug: isDev
    ? (message: string, ...optionalParams: any[]) =>
        console.debug(`[LinkedZen] ${message}`, ...optionalParams)
    : () => {},
};
