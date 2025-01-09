import * as Bootstrap from 'bootstrap';

declare global {
  interface Window {
    gtag: ((command: 'config' | 'event' | 'set' | 'js', parameter: string | Date, arguments?: Record<string, string | boolean> | string) => void) | never;
    clarity: ((command: 'set', parameter: string, arguments?: Record<string, string> | string) => void) | never;
  }
}

declare module 'bootstrap' {
  const bootstrap: typeof Bootstrap;
}
