/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import type AnimatedNode from './AnimatedNode';
import type { InterpolationConfigType } from './AnimatedInterpolation';
import type { PlatformConfig } from '../AnimatedPlatformConfig';

import AnimatedInterpolation from './AnimatedInterpolation';
import AnimatedValue from './AnimatedValue';
import AnimatedWithChildren from './AnimatedWithChildren';

type AnimatedSubtractionValue = number;

class AnimatedSubtraction extends AnimatedWithChildren<
  any,
  AnimatedSubtractionValue
> {
  _a: AnimatedNode;
  _b: AnimatedNode;

  constructor(
    a: AnimatedNode<any, AnimatedSubtractionValue> | AnimatedSubtractionValue,
    b: AnimatedNode<any, AnimatedSubtractionValue> | AnimatedSubtractionValue
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

  __getValue(): AnimatedSubtractionValue {
    return this._a.__getValue() - this._b.__getValue();
  }

  interpolate(
    config: InterpolationConfigType<AnimatedSubtractionValue>
  ): AnimatedInterpolation<AnimatedSubtractionValue> {
    return new AnimatedInterpolation(this, config);
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
      type: 'subtraction',
      input: [this._a.__getNativeTag(), this._b.__getNativeTag()]
    };
  }
}

export default AnimatedSubtraction;
