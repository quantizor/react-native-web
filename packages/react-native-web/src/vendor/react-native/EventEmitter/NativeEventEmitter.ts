/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import {
  type EventSubscription,
  type IEventEmitter
} from '../vendor/emitter/EventEmitter';
import Platform from '../../../exports/Platform';
import RCTDeviceEventEmitter from './RCTDeviceEventEmitter';
import invariant from '../../../modules/invariant';

type NativeModule = Readonly<{
  addListener: (eventType: string) => void,
  removeListeners: (count: number) => void,
}>;

export type { EventSubscription };

/**
 * `NativeEventEmitter` is intended for use by Native Modules to emit events to
 * JavaScript listeners. If a `NativeModule` is supplied to the constructor, it
 * will be notified (via `addListener` and `removeListeners`) when the listener
 * count changes to manage "native memory".
 *
 * Currently, all native events are fired via a global `RCTDeviceEventEmitter`.
 * This means event names must be globally unique, and it means that call sites
 * can theoretically listen to `RCTDeviceEventEmitter` (although discouraged).
 */
export default class NativeEventEmitter<TEventToArgsMap extends Record<string, any[]> = Record<string, any[]>, TKey extends Extract<keyof TEventToArgsMap, string> = Extract<keyof TEventToArgsMap, string>>
  implements IEventEmitter<TEventToArgsMap, TKey>
{
  _nativeModule?: NativeModule;

  constructor(nativeModule?: NativeModule | null) {
    if (Platform.OS === 'ios') {
      invariant(
        nativeModule != null,
        '`new NativeEventEmitter()` requires a non-null argument.'
      );
      this._nativeModule = nativeModule;
    }
  }

  addListener<TEvent extends TKey>(
    eventType: TEvent,
    listener: (...args: TEventToArgsMap[TEvent]) => unknown,
    context?: unknown
  ): EventSubscription {
    this._nativeModule?.addListener(eventType);
    let subscription: EventSubscription | null = RCTDeviceEventEmitter.addListener(
      eventType,
      listener,
      context
    );

    return {
      remove: () => {
        if (subscription != null) {
          this._nativeModule?.removeListeners(1);
          subscription.remove();
          subscription = null;
        }
      }
    };
  }

  /**
   * @deprecated Use `remove` on the EventSubscription from `addListener`.
   */
  removeListener<TEvent extends TKey>(
    eventType: TEvent,
    listener: (...args: TEventToArgsMap[TEvent]) => unknown
  ): void {
    this._nativeModule?.removeListeners(1);
    // NOTE: This will report a deprecation notice via `console.error`.
    RCTDeviceEventEmitter.removeListener(eventType, listener);
  }

  emit<TEvent extends TKey>(
    eventType: TEvent,
    ...args: TEventToArgsMap[TEvent]
  ): void {
    // Generally, `RCTDeviceEventEmitter` is directly invoked. But this is
    // included for completeness.
    RCTDeviceEventEmitter.emit(eventType, ...args);
  }

  removeAllListeners<TEvent extends TKey>(
    eventType: TEvent
  ): void {
    invariant(
      eventType != null,
      '`NativeEventEmitter.removeAllListener()` requires a non-null argument.'
    );
    this._nativeModule?.removeListeners(this.listenerCount(eventType));
    RCTDeviceEventEmitter.removeAllListeners(eventType);
  }

  listenerCount<TEvent extends TKey>(eventType: TEvent): number {
    return RCTDeviceEventEmitter.listenerCount(eventType);
  }
}
