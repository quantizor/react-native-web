/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import UIManager from '../../exports/UIManager';
import { PlatformMethods } from '../../types';
import useStable from '../useStable';

/**
 * Adds non-standard methods to the hode element. This is temporarily until an
 * API like `ReactNative.measure(hostRef, callback)` is added to React Native.
 */
export default function usePlatformMethods<T extends Node>(): (
  hostNode: T & PlatformMethods
) => void {
  // Avoid creating a new ref on every render.
  const ref = useStable(() => (hostNode: T & PlatformMethods): void => {
    if (hostNode != null) {
      hostNode.measure = (callback) => UIManager.measure(hostNode, callback);
      hostNode.measureLayout = (relativeToNode, success) =>
        UIManager.measureLayout(hostNode, relativeToNode, success);
      hostNode.measureInWindow = (callback) =>
        UIManager.measureInWindow(hostNode as unknown as HTMLElement, callback);
    }
  });

  return ref;
}
