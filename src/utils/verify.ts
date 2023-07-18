export function verify(object: unknown, message?: string): asserts object {
  if (typeof object === 'undefined' || object === null) {
    throw new Error(message ? `Verify failed: ${message}` : 'Verify failed');
  }
}

export function verifyString(object: unknown, message?: string): asserts object is string {
  if (typeof object !== 'string') {
    throw new Error(message || `${typeof object} is not a string`);
  }
}
