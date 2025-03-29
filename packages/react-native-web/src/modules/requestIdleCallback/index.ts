/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import canUseDOM from '../canUseDom';

const _requestIdleCallback = function (cb, options) {
  return setTimeout(() => {
    const start = Date.now();
    cb({
      didTimeout: false,
      timeRemaining() {
        return Math.max(0, options?.timeout ?? 50 - (Date.now() - start));
      }
    });
  }, 1) as unknown as number;
} as typeof window.requestIdleCallback;

const _cancelIdleCallback: typeof window.cancelIdleCallback = function (id: number) {
  clearTimeout(id);
};

const isSupported =
  canUseDOM && typeof window.requestIdleCallback !== 'undefined';

const requestIdleCallback: (cb: any, options?: any) => number = isSupported
  ? window.requestIdleCallback
  : _requestIdleCallback;
const cancelIdleCallback: (TimeoutID) => void = isSupported
  ? window.cancelIdleCallback
  : _cancelIdleCallback;

export default requestIdleCallback;
export { cancelIdleCallback };
