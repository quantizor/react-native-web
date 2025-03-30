/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import AnimatedInterpolation from './AnimatedInterpolation';
import AnimatedNode from './AnimatedNode';
import AnimatedValue from './AnimatedValue';
import AnimatedWithChildren from './AnimatedWithChildren';

import type { InterpolationConfigType } from './AnimatedInterpolation';
import type { PlatformConfig } from '../AnimatedPlatformConfig';

export type AnimatedDivisionValue = number;

class AnimatedDivision extends AnimatedWithChildren<AnimatedDivisionValue> {
  _a: AnimatedNode<AnimatedDivisionValue>;
  _b: AnimatedNode<AnimatedDivisionValue>;
  _warnedAboutDivideByZero: boolean = false;

  constructor(
    a: AnimatedNode | AnimatedDivisionValue,
    b: AnimatedNode | AnimatedDivisionValue
  ) {
    super();
    if (b === 0 || (b instanceof AnimatedNode && b.__getValue() === 0)) {
      console.error('Detected potential division by zero in AnimatedDivision');
    }
    this._a = typeof a === 'number' ? new AnimatedValue(a) : a;
    this._b = typeof b === 'number' ? new AnimatedValue(b) : b;
  }

  __makeNative(platformConfig?: PlatformConfig) {
    this._a.__makeNative(platformConfig);
    this._b.__makeNative(platformConfig);
    super.__makeNative(platformConfig);
  }

  __getValue(): AnimatedDivisionValue {
    const a = this._a.__getValue();
    const b = this._b.__getValue();
    if (b === 0) {
      // Prevent spamming the console/LogBox
      if (!this._warnedAboutDivideByZero) {
        console.error('Detected division by zero in AnimatedDivision');
        this._warnedAboutDivideByZero = true;
      }
      // Passing infinity/NaN to Fabric will cause a native crash
      return 0;
    }
    this._warnedAboutDivideByZero = false;
    return a / b;
  }

  interpolate(
    config: InterpolationConfigType<AnimatedDivisionValue>
  ): AnimatedInterpolation<AnimatedDivisionValue> {
    return new AnimatedInterpolation<AnimatedDivisionValue>(this, config);
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
      type: 'division',
      input: [this._a.__getNativeTag(), this._b.__getNativeTag()]
    };
  }
}

export default AnimatedDivision;
