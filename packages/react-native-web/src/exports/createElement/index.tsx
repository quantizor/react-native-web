/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import React from 'react';
import AccessibilityUtil from '../../modules/AccessibilityUtil';
import createDOMProps from '../../modules/createDOMProps';
import { LocaleProvider } from '../../modules/useLocale';

const createElement = <T extends React.ComponentType<any> | keyof React.JSX.IntrinsicElements>(component: T, props: Record<string, unknown>, options?: {writingDirection?: 'ltr' | 'rtl'}, ...children: any[]) => {
  // Use equivalent platform elements where possible.
  let accessibilityComponent: T | undefined;
  if (component && component.constructor === String) {
    // @ts-ignore fix later
    accessibilityComponent =
      AccessibilityUtil.propsToAccessibilityComponent(props);
  }
  const Component = accessibilityComponent || component;
  const domProps = createDOMProps(Component, props as React.ComponentProps<T>, options);

  const element = React.createElement(Component, domProps, ...children);

  // Update locale context if element's writing direction prop changes
  const elementWithLocaleProvider = domProps.dir ? (
    <LocaleProvider
      children={element}
      direction={domProps.dir}
      locale={domProps.lang}
    />
  ) : (
    element
  );

  return elementWithLocaleProvider;
};

export default createElement;
