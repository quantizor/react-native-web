/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import type { PlatformMethods } from '../../types';
import type { ViewProps } from '../View';

import * as React from 'react';
import createElement from '../createElement';
import useMergeRefs from '../../modules/useMergeRefs';
import usePlatformMethods from '../../modules/usePlatformMethods';
import PickerItem from './PickerItem';
import StyleSheet from '../StyleSheet';

interface PickerProps extends ViewProps {
  children?: React.ReactNode | React.ReactNode[],
  enabled?: boolean,
  onValueChange?: (value: number | string, selectedIndex: number) => void,
  selectedValue?: number | string,
  style?: any,
  /* compat */
  itemStyle?: any,
  mode?: string,
  prompt?: string
};

let Picker: React.ForwardRefExoticComponent<PickerProps & React.RefAttributes<HTMLSelectElement & PlatformMethods>> & {
  Item?: typeof PickerItem
};

Picker = React.forwardRef((props, forwardedRef) => {
  const {
    children,
    enabled,
    onValueChange,
    selectedValue,
    style,
    testID,
    itemStyle,
    mode,
    prompt,
    ...other
  } = props;

  const hostRef = React.useRef<HTMLSelectElement | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { selectedIndex, value } = e.target;
    if (onValueChange) {
      onValueChange(value, selectedIndex);
    }
  }

  const supportedProps: React.JSX.IntrinsicElements['select'] = {
    children,
    disabled: enabled === false ? true : undefined,
    onChange: handleChange,
    style: [styles.initial, style],
    testID,
    value: selectedValue,
    ...other
  };

  const platformMethodsRef = usePlatformMethods(supportedProps);

  const setRef = useMergeRefs(hostRef, platformMethodsRef, forwardedRef);

  supportedProps.ref = setRef as (node: HTMLSelectElement | null) => void;

  return createElement('select', supportedProps);
});

Picker.Item = PickerItem;

const styles = StyleSheet.create({
  initial: {
    fontFamily: 'System',
    fontSize: 'inherit',
    margin: 0
  }
});

export default Picker;
