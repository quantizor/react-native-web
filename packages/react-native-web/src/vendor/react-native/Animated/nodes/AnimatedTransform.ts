/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import AnimatedNode from './AnimatedNode';
import AnimatedWithChildren from './AnimatedWithChildren';
import NativeAnimatedHelper, {
  AnimatedTransformConfig
} from '../NativeAnimatedHelper';

export type AnimatedTransformValue = Record<
  string,
  string | number | AnimatedNode<string | number>
>;

class AnimatedTransform extends AnimatedWithChildren<
  readonly AnimatedTransformValue[]
> {
  _transforms: readonly AnimatedTransformValue[];

  constructor(transforms: readonly AnimatedTransformValue[]) {
    super();
    this._transforms = transforms;
  }

  __makeNative() {
    this._transforms.forEach((transform) => {
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof AnimatedNode) {
          value.__makeNative();
        }
      }
    });
    super.__makeNative();
  }

  __getValue(): readonly AnimatedTransformValue[] {
    return this._transforms.map((transform) => {
      const result = {};
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof AnimatedNode) {
          result[key] = value.__getValue();
        } else {
          result[key] = value;
        }
      }
      return result;
    });
  }

  __getAnimatedValue(): readonly AnimatedTransformValue[] {
    return this._transforms.map((transform) => {
      const result = {};
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof AnimatedNode) {
          result[key] = value.__getAnimatedValue();
        } else {
          // All transform components needed to recompose matrix
          result[key] = value;
        }
      }
      return result;
    });
  }

  __attach(): void {
    this._transforms.forEach((transform) => {
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof AnimatedNode) {
          value.__addChild(this);
        }
      }
    });
  }

  __detach(): void {
    this._transforms.forEach((transform) => {
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof AnimatedNode) {
          value.__removeChild(this);
        }
      }
    });
    super.__detach();
  }

  __getNativeConfig(): any {
    const transConfigs: AnimatedTransformConfig[] = [];

    this._transforms.forEach((transform) => {
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof AnimatedNode) {
          transConfigs.push({
            type: 'animated',
            property: key,
            nodeTag: value.__getNativeTag()
          });
        } else {
          transConfigs.push({
            type: 'static',
            property: key,
            value: NativeAnimatedHelper.transformDataType(value)
          });
        }
      }
    });

    NativeAnimatedHelper.validateTransform(transConfigs);
    return {
      type: 'transform',
      transforms: transConfigs
    };
  }
}

export default AnimatedTransform;
