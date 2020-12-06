export const isResponseSuccess = (status: number): boolean => status >= 200 && status < 300;

export function removeItemAtIndex<T>(list: Array<T>, index: number): Array<T> {
  return [...list.slice(0, index), ...list.slice(index + 1)];
}

export function replaceItemAtIndex<T>(list: Array<T>, index: number, item: T): Array<T> {
  return [...list.slice(0, index), item, ...list.slice(index + 1)];
}

export function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
}
