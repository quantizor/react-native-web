/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import type AnimatedNode from './AnimatedNode';

import AnimatedInterpolation from './AnimatedInterpolation';
import AnimatedWithChildren from './AnimatedWithChildren';

import type { InterpolationConfigType } from './AnimatedInterpolation';
import type { PlatformConfig } from '../AnimatedPlatformConfig';

export type AnimatedDiffClampValue = number;

class AnimatedDiffClamp extends AnimatedWithChildren<AnimatedDiffClampValue> {
  _a: AnimatedNode<AnimatedDiffClampValue>;
  _min: number;
  _max: number;
  _value: number;
  _lastValue: number;

  constructor(
    a: AnimatedNode<AnimatedDiffClampValue>,
    min: number,
    max: number
  ) {
    super();

    this._a = a;
    this._min = min;
    this._max = max;
    this._value = this._lastValue = this._a.__getValue();
  }

  __makeNative(platformConfig?: PlatformConfig) {
    this._a.__makeNative(platformConfig);
    super.__makeNative(platformConfig);
  }

  interpolate(
    config: InterpolationConfigType<AnimatedDiffClampValue>
  ): AnimatedInterpolation<AnimatedDiffClampValue> {
    return new AnimatedInterpolation<AnimatedDiffClampValue>(this, config);
  }

  __getValue(): AnimatedDiffClampValue {
    const value = this._a.__getValue();
    const diff = value - this._lastValue;
    this._lastValue = value;
    this._value = Math.min(Math.max(this._value + diff, this._min), this._max);
    return this._value;
  }

  __attach(): void {
    this._a.__addChild(this);
  }

  __detach(): void {
    this._a.__removeChild(this);
    super.__detach();
  }

  __getNativeConfig(): any {
    return {
      type: 'diffclamp',
      input: this._a.__getNativeTag(),
      min: this._min,
      max: this._max
    };
  }
}

export default AnimatedDiffClamp;
