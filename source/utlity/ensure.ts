export function ensure<T>(arg: T | undefined | null, message: string = 'This value was promised to be there.'): T {
  if (arg === undefined || arg === null) {
    throw new TypeError(message);
  }
  return arg;
}
