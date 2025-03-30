/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import View from '../../../exports/View';
import useMergeRefs from '../Utilities/useMergeRefs';
import useAnimatedProps from './useAnimatedProps';

export type AnimatedComponentType<
  Props extends { [key: string]: any },
> = React.ComponentType<
  Props & {
    passthroughAnimatedPropExplicitValues?: React.ComponentProps<typeof View>
  }
>;

/**
 * Experimental implementation of `createAnimatedComponent` that is intended to
 * be compatible with concurrent rendering.
 */
export default function createAnimatedComponent<T extends React.ComponentType<any>, TInstance extends React.ComponentRef<T>>(
  Component: T
) {
  return React.forwardRef((props: React.PropsWithoutRef<React.ComponentProps<T>>, forwardedRef: React.Ref<TInstance>) => {
    const [reducedProps, callbackRef] = useAnimatedProps<typeof props, TInstance>(
      props
    );
    const ref = useMergeRefs<TInstance | null>(callbackRef, forwardedRef);

    // Some components require explicit passthrough values for animation
    // to work properly. For example, if an animated component is
    // transformed and Pressable, onPress will not work after transform
    // without these passthrough values.
    const { passthroughAnimatedPropExplicitValues, style } = reducedProps;
    const { style: passthroughStyle, ...passthroughProps } =
      passthroughAnimatedPropExplicitValues ?? {};
    const mergedStyle = [style, passthroughStyle];

    return (
      <Component
        {...reducedProps}
        {...passthroughProps}
        style={mergedStyle}
        ref={ref}
      />
    );
  });
}