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

export const logger = {
  log: (message: string) => console.log(`[LinkedZen] ${message}`),
  error: (message: string) => console.error(`[LinkedZen] ${message}`),
  warn: (message: string) => console.warn(`[LinkedZen] ${message}`),
  info: (message: string) => console.info(`[LinkedZen] ${message}`),
  debug: isDev
    ? (message: string) => console.debug(`[LinkedZen] ${message}`)
    : () => {},
};
