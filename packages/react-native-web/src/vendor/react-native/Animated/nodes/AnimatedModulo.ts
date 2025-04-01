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

export type AnimatedModuloValue = number;

class AnimatedModulo extends AnimatedWithChildren<AnimatedModuloValue> {
  _a: AnimatedNode<AnimatedModuloValue>;
  _modulus: number;

  constructor(a: AnimatedNode<AnimatedModuloValue>, modulus: number) {
    super();
    this._a = a;
    this._modulus = modulus;
  }

  __makeNative(platformConfig?: PlatformConfig) {
    this._a.__makeNative(platformConfig);
    super.__makeNative(platformConfig);
  }

  __getValue(): AnimatedModuloValue {
    return (
      ((this._a.__getValue() % this._modulus) + this._modulus) % this._modulus
    );
  }

  interpolate(
    config: InterpolationConfigType<AnimatedModuloValue>
  ): AnimatedInterpolation<AnimatedModuloValue> {
    return new AnimatedInterpolation<AnimatedModuloValue>(this, config);
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
      type: 'modulus',
      input: this._a.__getNativeTag(),
      modulus: this._modulus
    };
  }
}

export default AnimatedModulo;
