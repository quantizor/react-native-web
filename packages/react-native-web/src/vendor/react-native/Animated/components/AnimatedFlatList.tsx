/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import FlatList from '../../../../exports/FlatList';
import createAnimatedComponent from '../createAnimatedComponent';

/**
 * @see https://github.com/facebook/react-native/commit/b8c8562
 */
const FlatListWithEventThrottle = React.forwardRef(
  (
    props: React.ComponentProps<typeof FlatList<any>>,
    ref: React.Ref<React.ComponentRef<typeof FlatList<any>>>
  ) => <FlatList scrollEventThrottle={0.0001} {...props} ref={ref} />
);

export default createAnimatedComponent<typeof FlatList<any>>(
  FlatListWithEventThrottle
);
