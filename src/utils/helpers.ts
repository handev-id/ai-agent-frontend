export function delay(ms: number, callback: () => void) {
  return setTimeout(callback, ms);
}
