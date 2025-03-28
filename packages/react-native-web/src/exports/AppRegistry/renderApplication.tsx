/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ComponentProps, ComponentType, ReactElement } from 'react';

import AppContainer from './AppContainer';
import render, { hydrate } from '../render';
import invariant from '../../modules/invariant';
import StyleSheet from '../StyleSheet';
import React from 'react';

export type Application = {
  unmount: () => void
};

export default function renderApplication<T extends ComponentType<any>>(
  RootComponent: T,
  WrapperComponent?: ComponentType<any>,
  callback?: () => void,
  options?: {
    hydrate: boolean,
    initialProps: ComponentProps<T>,
    mode: 'concurrent' | 'blocking',
    rootTag: any
  }
): Application {
  const { hydrate: shouldHydrate, initialProps, rootTag } = options || {};
  const renderFn = shouldHydrate ? hydrate : render;

  invariant(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);

  return renderFn(
    <AppContainer
      WrapperComponent={WrapperComponent}
      ref={callback}
      rootTag={rootTag}
    >
      <RootComponent {...initialProps} />
    </AppContainer>,
    rootTag
  );
}

export function getApplication(
  RootComponent: ComponentType<Object>,
  initialProps: Object,
  WrapperComponent?: ComponentType<any>
): { element: ReactElement, getStyleElement: (Object) => ReactElement<unknown, 'style'> } {
  const element = (
    <AppContainer WrapperComponent={WrapperComponent} rootTag={{}}>
      <RootComponent {...initialProps} />
    </AppContainer>
  );

  // Don't escape CSS text
  const getStyleElement = (props) => {
    const sheet = StyleSheet.getSheet();
    return (
      <style
        {...props}
        dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        id={sheet.id}
      />
    );
  };
  return { element, getStyleElement };
}
