/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import type AnimatedNode from './AnimatedNode';

import AnimatedInterpolation from './AnimatedInterpolation';
import AnimatedValue from './AnimatedValue';
import AnimatedWithChildren from './AnimatedWithChildren';

import type { InterpolationConfigType } from './AnimatedInterpolation';
import type { PlatformConfig } from '../AnimatedPlatformConfig';

export type AnimatedMultiplicationValue = number;

class AnimatedMultiplication extends AnimatedWithChildren<AnimatedMultiplicationValue> {
  _a: AnimatedNode<AnimatedMultiplicationValue>;
  _b: AnimatedNode<AnimatedMultiplicationValue>;

  constructor(
    a: AnimatedNode | AnimatedMultiplicationValue,
    b: AnimatedNode | AnimatedMultiplicationValue
  ) {
    super();
    this._a = typeof a === 'number' ? new AnimatedValue(a) : a;
    this._b = typeof b === 'number' ? new AnimatedValue(b) : b;
  }

  __makeNative(platformConfig?: PlatformConfig) {
    this._a.__makeNative(platformConfig);
    this._b.__makeNative(platformConfig);
    super.__makeNative(platformConfig);
  }

  __getValue(): AnimatedMultiplicationValue {
    return this._a.__getValue() * this._b.__getValue();
  }

  interpolate(
    config: InterpolationConfigType<AnimatedMultiplicationValue>
  ): AnimatedInterpolation<AnimatedMultiplicationValue> {
    return new AnimatedInterpolation<AnimatedMultiplicationValue>(this, config);
  }
  __attach(): void {
    this._a.__addChild(this);
    this._b.__addChild(this);
  }

  __detach(): void {
    this._a.__removeChild(this);
    this._b.__removeChild(this);
    super.__detach();
  }

  __getNativeConfig(): any {
    return {
      type: 'multiplication',
      input: [this._a.__getNativeTag(), this._b.__getNativeTag()]
    };
  }
}

export default AnimatedMultiplication;
